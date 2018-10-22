/**
    This class is the parent class for all interactive objects that exist in a combat stage.
    The Actor class extends the Phaser.Sprite class, which means that any operations defined
    in this or a child class's update method will be called internall by Phaser during the update step. 
    
*/
class Actor extends Phaser.GameObjects.Sprite
{
    /**
        @param {Stage} stage Stage that this Actor belongs to
        @param {StageCoord} coord StageCoord of the starting position of this Actor
        @param {string} key string name of image (or spritesheet) that this actor will use as its body
        @param {Direction.prop} direction Direction property representing the direction this Actor starts off facing (optional. Defaults to west)
        @param {bool} belongsToGrid whether the grid should track this Actor's position
    */
    constructor(stage, x, y, key, direction, belongsToGrid)
    {    
        const stagePosition = stage.getCoordByPixels(x, y);
        const currentTile = stage.getTileAt(stagePosition);
        
        super(stage.scene, x, y, key); //call parent constructor in our own context
        
        this.stage = stage;
        this.faceDirection = direction || Direction.WEST;
        this.belongsToGrid = belongsToGrid || true;
        this.stagePosition = null;
        this.currentTile = null;
        if (this.belongsToGrid)
        {
            this.stagePosition = stagePosition;
            this.currentTile = currentTile;
            this.stage.enterTile(this.stagePosition);
        }

        this.scene.physics.add.existing(this);

        //whether or not collision physics should effect this actor when it overlaps another actor
        //collision will only occur if both actors have collideable set to true
        //if neither object is collideable then collision callbacks will not occur
        this.collideable = false;
        
        this.teamTag = "-1";
        this.targetable = false;
        this.maxHp = 1;
        this.hp = this.maxHp;
        this.attackDamage = 0;
        
        //used to overwrite any child class's update method when plugging them into an external controller
        this.overridden = false;
    }

    /**
        Updates this Actor's properties to reflect it's current coordinate on the stage
        NOTE: call any time an actor moves
    */
    updatePosition() 
    {
        
        const coord = this.stage.getCoordByPixels(this.x, this.y);
        
        if (!this.stagePosition.compareCoord(coord)){
            this.stage.leaveTile(this.scenePosition);
            this.stagePosition = coord;
            this.currentTile = this.stage.getTileAt(this.stagePosition);
            this.stage.enterTile(this.stagePosition);
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
    preUpdate() 
    {
        if (this.overridden){
            return;
        }
        this.action();
    }

    /**
     * This method should be overriden by child class to process their own internal logic.
     * action will be called automatically by the parent class if actor is currently able to 
     * take its own actions.
     */
    action(){}

    /**
        Handles setting this actor's team
    */
    setTeam(name) 
    {
        this.teamTag = name;
    }

    /**
        Handles damaging this Actor
        
        @param damage number the amount of this Actor's hp to subtract
    */
    takeHit(damage) 
    {
        this.hp -= damage;
    }

    /**
    *   Handles collisions between this Actor and other Actors on a different team
    * 
    *   NOTE: this method is called on both Actors  
    *   @param {Actor} other Actor that this Actor collided with
    */
    enemyCollision(other) {}

    /**
    *   Handles collisions between this Actor and other Actors on the same team
    *   
    *   NOTE: this method is called on both Actors  
    *   @param {Actor} other Actor that this Actor collided with
    */
    friendlyCollision(other) {}

    /**
     * This method is called after the collision handler has been called on both actors.
     * This is where Actors should run any necessary operations on themselves for collision.
     */
    postCollision()
    {
        if (this.hp <= 0)
        {
            this.die();
        }
    }

    /**
        Handles destroying this object.
        NOTE: This eliminates all internal references to this Actor, but in order for the physical object to be
        garbage collected all external references will need to be nullified as well
    */
    die() 
    {
        if (this.belongsToGrid)
        {
            this.stage.leaveTile(this.stagePosition);
        }
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }

    /**
     * 
     * @param {xint} x position to place this actor
     * @param {int} y position to place this actor
     * @param {Direction} faceDirection faceDirection of this actor (optional)
     */
    reset(x, y, faceDirection)
    {
        this.setPosition(x, y);
        this.faceDirection = faceDirection || Direction.WEST;
        
        if(this.belongsToGrid)
        {
            this.updatePosition();
        }
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
    }

    /**
        Returns an object literal containing the essential properties the stage needs to know in order to
        make a copt of this object. Mainly for outputting to JSON. This makes it easier for children to
        append properties when overriding Actor.toString.
    */
    getDataLiteral() 
    {
        const data = {};
        data.type = this.ACTOR_TYPE;
        data.x = this.x;
        data.y = this.y;
        data.faceDirection = this.faceDirection;
        data.team = this.teamTag;
        return data;
    }

    toString() 
    {
        return JSON.stringify(this.getDataLiteral());
    }
}