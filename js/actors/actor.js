/**
    This class is the parent class for all interactive objects that exist in a combat stage.
    The Actor class extends the Phaser.Sprite class, which means that any operations defined
    in this or a child class's update method will be called internall by Phaser during the update step. 
    
    @param stage Stage that this Actor belongs to
    @param coord StageCoord of the starting position of this Actor
    @param key string name of image (or spritesheet) that this actor will use as its body
    @param direction Direction property representing the direction this Actor starts off facing (optional. Defaults to west)
*/
function Actor(stage, coord, key, direction){
    this.scene = stage; //NOTE: this does make things a litte confusing... but Phaser.Sprite already
                        //has a definition for this.stage so we can't use that or everything breaks
    
    this.faceDirection = direction || Direction.WEST;
    
    this.game = this.scene.game;
    
    //in case what is passed in is not actually a StageCoord (JSON data)
    this.scenePosition = new StageCoord(coord.x, coord.y); 
    this.currentTile = this.scene.getTileAt(this.scenePosition.x, this.scenePosition.y);
    
    this.scene.enterTile(this.scenePosition);

    Phaser.Sprite.call(this, this.game, this.currentTile.x, this.currentTile.y, key); //call parent constructor in our own context
    this.game.add.existing(this); //add ourself to Phaser parent container
    
    this.game.physics.p2.enable(this);        
    this.body.setRectangle(this.width, this.height);
    
    this.teamTag = "-1";
    this.targetable = false;
    this.maxHp = 1;
    this.hp = this.maxHp;
    this.attackDamage = 0;
    
    //used to overwrite any child class's update method when plugging them into an external controller
    this.overridden = false; 
    
    this.id = Actor.prototype.NUM_ACTORS_CREATED++; //give each actor a unique id
}

Actor.prototype = Object.create(Phaser.Sprite.prototype); //extend Phaser.Sprite prototype
Actor.constructor = Actor;

Actor.prototype.OBJ_TYPE = "actor";
Actor.prototype.ACTOR_TYPE = "actor";

Actor.prototype.NUM_ACTORS_CREATED = 0;

/**
    Updates this Actor's properties to reflect it's current coordinate on the stage
    NOTE: call any time an actor moves
*/
Actor.prototype.updatePosition = function(){
    
    var coord = this.scene.getCoordByPixels(this.x, this.y);
    
    if (!this.scenePosition.compareCoord(coord)){
        this.scene.leaveTile(this.scenePosition);
        this.scenePosition = coord;
        this.currentTile = this.scene.getTileAt(this.scenePosition.x, this.scenePosition.y);
        this.scene.enterTile(this.scenePosition);
    }
}



/**
    Performs a root level checks for the actor, including interacting with grid tiles. 
    When child classes override this method they should ALWAYS be sure to call the parent method
    in the following fashion before performing any additional operations: 
    
    if (!Actor.prototype.update.call(this)){
        return;
    }
    
    //do stuff
    
    @return bool representing whether a child class is permitted to continue performing update operations
*/
Actor.prototype.update = function(){
    
    if (this.currentTile.currentState == this.currentTile.STATES.BURNING){
        this.burn();
    }
    
    if (this.overridden){
        return false;
    }
    return true;
}



/**
    Handles setting this actor's team
*/
Actor.prototype.setTeam = function(name){
    this.teamTag = name;
}



/**
    Handles damaging this Actor
    
    @param damage number the amount of this Actor's hp to subtract
*/
Actor.prototype.takeHit = function(damage){
    this.hp -= damage;
    if (this.hp <= 0){
        this.die();
    }
}



/**
    Hanldes collisions between this Actor and other Actors
    NOTE: the actor passed into this method should generally not be mutated as, during collision event,
    that actor will have this same method called on it as well with this object passed in.
    
    @param other Actor that this Actor collided with
*/
Actor.prototype.collideWithActor = function(other){}



/**
    Handles the interaction between Actors and FireTiles
    
    @param heat number the amount of heat to apply to this Actor
*/
Actor.prototype.burn = function(){
    //console.log("I'm burning!");
}



/**
    Handles destroying this object.
    NOTE: This eliminates all internal references to this Actor, but in order for the physical object to be
    garbage collected all external references will need to be nullified as well
*/
Actor.prototype.die = function(){
    this.scene.leaveTile(this.scenePosition);
    this.scene.activateTile(this.scenePosition,.5);
    this.destroy();
}



/**
    Returns an object literal containing the essential properties the stage needs to know in order to
    make a copt of this object. Mainly for outputting to JSON. This makes it easier for children to
    append properties when overriding Actor.toString.
*/
Actor.prototype.getDataLiteral = function(){
    var data = {};
    data.type = this.ACTOR_TYPE;
    data.scenePosition = this.scenePosition;
    data.team = this.teamTag;
    data.faceDirection = this.faceDirection;
    return data;
}



Actor.prototype.toString = function(){
    return JSON.stringify(this.getDataLiteral());
}