/**
    This Class represents the actor that the player controls. This class handles tying keyboard input
    to player movement.
    The Spider has a target tile (the tile is can build on/interact with) that is updated based on 
    its current position and the direction it's facing
    
    */
class Player extends Actor
{
    /**
     @param stage the stage that this Spider belongs to
     @param coord StageCoord of the starting position of this Spider
     @param direction the starting faceDirection of this Spider (optional. Defaults to west)
     */
    constructor(stage, x, y, direction) 
    {
        direction = direction || Direction.WEST;
        super(stage, x, y, "ball", direction);
        this.ACTOR_TYPE = "player";
                
        this.speed = 100;
        this.targetable = true;
        this.collideable = true;
            
        this.maxHp = 10;
        this.hp = this.maxHp;
        this.attackDamage = .5;
        this.targetPosition;
        this.targetTile;
        this.targetBox = this.scene.add.sprite(0, 0, 'targetBox');
        this.targetBox.setOrigin(.5,.5);
        this.sprite.setScale(.4,.4);
        this.body.setSize(this.sprite.width * .4, this.sprite.height * .4);
        this.body.setOffset(-(this.sprite.width*.4)/2, -(this.sprite.height*.4)/2);
        this.updateTarget(); //initializes target variables

        this.ui = new ActorUI(this);
    }

    /**
        Handles updating this Spider's position on the stage and setting all values accordingly.
    */
    updatePosition() 
    {
        const xModifyer = Direction.modifyer[this.faceDirection].x;
        const yModifyer = Direction.modifyer[this.faceDirection].y;
        //an acotr's position is the last tile any part of it moved into
        const coord = this.stage.getCoordByPixels(this.x +((this.width/2)*xModifyer), this.y+((this.height/2)*yModifyer));
        
        if (!this.stagePosition.compareCoord(coord))
        {
            this.stage.leaveTile(this.stagePosition);
            this.stagePosition = coord;
            this.currentTile = this.stage.getTileAt(this.stagePosition);
            this.stage.enterTile(this.stagePosition);
        }
        
        this.updateTarget();
    }

    /**
        Handles updating the target tile of this Spider
    */
    updateTarget()
    {
        this.targetPosition = this.stagePosition.getNeighbor(this.faceDirection);
        if (this.stage.checkInBounds(this.targetPosition))
        {
            this.targetTile = this.stage.getTileAt(this.targetPosition);
            this.targetBox.x = this.targetTile.x;
            this.targetBox.y = this.targetTile.y;
            this.targetBox.setVisible(true);
        } 
        else 
        {
            this.targetTile = null;
            this.targetBox.setVisible(false);
        }
    }

    /**
        Places a new actor on the stage at this player's current target tile. The new actor is passed
        the player's current face direction as well as it's team tag
        
        @param actorType string the type of Actor to create
        @return bool whether the new Actor was successfully built
    */
    build(actorType) 
    {
        if (this.stage.checkInBounds(this.targetPosition))
        {
            if (this.stage.checkIfEmpty(this.targetPosition))
            {
                this.stage.spawn.spawnActor(actorType, this.targetBox.x, this.targetBox.y, this.faceDirection, this.teamTag);
                return true;
            }
            else
            {
                const attack = this.stage.spawn.spawnActor("playerattack", this.targetBox.x, this.targetBox.y, this.faceDirection, this.teamTag);
                attack.attackDamage = this.attackDamage;
                return true;
            }
        }
        return false
    }

    /**
        Override parent die method. Hanldes cleaning up this Spider's other associated sprites
    */
    die() 
    {
        super.die();
        this.targetBox.setActive(false);
        this.targetBox.setVisible(false);
    }

    reset(x, y, faceDirection)
    {
        super.reset(x, y, faceDirection);
        this.targetBox.setActive(true);
        this.targetBox.setVisible(true);
        this.updateTarget();
    }
}