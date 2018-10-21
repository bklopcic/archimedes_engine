/**
    This class is the parent class for all interactive objects that exist in a combat stage.
    The Actor class extends the Phaser.Sprite class, which means that any operations defined
    in this or a child class's update method will be called internall by Phaser during the update step. 
    
*/
class Actor extends Phaser.GameObjects.Sprite
{
    /**
        @param stage Stage that this Actor belongs to
        @param coord StageCoord of the starting position of this Actor
        @param key string name of image (or spritesheet) that this actor will use as its body
        @param direction Direction property representing the direction this Actor starts off facing (optional. Defaults to west)
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

        this.OBJ_TYPE = "actor";
        this.ACTOR_TYPE = "actor";
        
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
    collideWithActor(other) {}

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
        data.stagePosition = this.stagePosition;
        data.team = this.teamTag;
        data.faceDirection = this.faceDirection;
        return data;
    }

    toString() 
    {
        return JSON.stringify(this.getDataLiteral());
    }
}