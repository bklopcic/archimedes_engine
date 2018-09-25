/**
    This Class represents the actor that the player controls. This class handles tying keyboard input
    to player movement.
    The Spider has a target tile (the tile is can build on/interact with) that is updated based on 
    its current position and the direction it's facing
    
    @param stage the stage that this Spider belongs to
    @param coord StageCoord of the starting position of this Spider
    @param direction the starting faceDirection of this Spider (optional. Defaults to west)
*/
function Spider(stage, coord, direction=Direction.WEST){
    Actor.call(this, stage, coord, 'spider', direction);
    
    this.body.fixedRotation = true;
    
    this.speed = 100;
    this.targetable = true;
        
    this.maxHp = 10;
    this.hp = this.maxHp;
    this.targetPosition;
    this.targetTile;
    this.targetBox = this.game.add.sprite(0, 0, 'targetBox');
    this.targetBox.anchor.set(.5,.5);
    this.updateTarget(); //initializes target variables
}

Spider.prototype = Object.create(Actor.prototype); //Extend Actor class
Spider.prototype.constructor = Spider;

Spider.prototype.ACTOR_TYPE = "spider";

/**
    Handles updating this Spider's position on the stage and setting all values accordingly.
*/
Spider.prototype.updatePosition = function(){
    var xModifyer = Direction.modifyer[this.faceDirection].x;
    var yModifyer = Direction.modifyer[this.faceDirection].y;
    var coord = this.scene.getCoordByPixels(this.x +((this.width/2)*xModifyer), this.y+((this.height/2)*yModifyer));
    
    if (!this.scenePosition.compareCoord(coord)){
        this.scene.leaveTile(this.scenePosition);
        this.scenePosition = coord;
        this.currentTile = this.scene.getTileAt(this.scenePosition.x, this.scenePosition.y);
        this.scene.enterTile(this.scenePosition);
    }
    
    this.updateTarget();
}



/**
    Handles updating the target tile of this Spider
*/
Spider.prototype.updateTarget = function(){
    this.targetPosition = this.scenePosition.getNeighbor(this.faceDirection);
    if (this.scene.checkInBounds(this.targetPosition)){
        this.targetTile = this.scene.getTileAt(this.targetPosition.x, this.targetPosition.y);
        this.targetBox.x = this.targetTile.x;
        this.targetBox.y = this.targetTile.y;
        this.targetBox.visible = true;
    } else {
        this.targetTile = null;
        this.targetBox.visible = false;
    }
}



/**
    Places a new actor on the stage at this Spider's current target tile. The new actor is passed
    the spider's current face direction as well as it's team tag
    
    @param actorType string the type of Actor to create
    @return bool whether the new Actor was successfully built
*/
Spider.prototype.build = function(actorType){
    if (this.scene.checkInBounds(this.targetPosition) && this.scene.checkIfEmpty(this.targetPosition)){
        this.scene.addActor(this.targetPosition, actorType, this.teamTag, this.faceDirection);
        return true;
    }
    return false
}



/**
    Override parent die method. Hanldes cleaning up this Spider's other associated sprites
*/
Spider.prototype.die = function(){
    this.targetBox.destroy();
    Actor.prototype.die.call(this);
}