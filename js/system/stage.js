/**
    Simply defined, the stage class is a place for actors to interact. This class defines the environment
    in which the actors will exist. The stage is in charge of handling all actor interactions (collisions, etc)
*/
class Stage extends StageGrid
{
    /**
     * 
     * @param game Phaser.game that this Stage belongs to
     * @param data Object containing the information to be used for stage setup
     * @param offsetX number (in pixels) the horizontal offset of the top left corner
       of the stage from the top left corner of the game world (optional. defaults to 0)
     * @param offsetY number (in pixels) the vertical offset of the top left corner
       of the stage from the top left corner of the game world (optional. defaults to 0)
     */
    constructor(scene, xSize, ySize, offsetX, offsetY, data)
    {
        data = data || null;
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        if (data)
        {
            super(scene, data.xSize, data.ySize, data.tile, offsetX, offsetY);
        }
        else
        {
            super(scene, xSize, ySize, ["tile"], offsetX, offsetY);
        }

        this.spawn = new ActorManager(this, this.scene.add.group());
        
        if (data)
        {
            this.spawn.loadActorsFromData(data);
        }
    }

    /**
        Gets the last actor of the specified type
        
        @return Actor
    */
    getActorByType(type)
    {
        var actor = null;
        this.actors.forEach(function(a)
        {
            if (a.ACTOR_TYPE == type)
            {
                actor = a;
            }
        }, this);
        return actor;
    }



    /**
     * resolves collisions between actors by the following ruleset:
     *      - actors' collision handlers will only be called if at least one actor is collideable
     * 
     *      - if both actors are collideable, collision physics will be applied, otherwise they will simply overlap
     * 
     *      - if colliding actors are on the same team, their internal friendlyCollision() methods will be
     *        called in turn, passing in a reference to the other actor
     * 
     *      - if the actors are not on the same team, enemyCollision() wil be called instead, also passing a reference
     * 
     *      - each actor will have postCollision() called after either enemyCollision  or friendlyCollision has been
     *        invoked on both actors
    */
    collisionHandler(actor1, actor2)
    {
        if (actor1.collideable || actor2.collideable)
        {
            if (actor1.collideable && actor2.collideable)
            {
                this.scene.physics.collide(actor1, actor2); //apply collision physics
            }
            
            if (actor1.teamTag == actor2.teamTag)
            {
                actor1.friendlyCollision(actor2);
                actor2.friendlyCollision(actor1);
            }
            else
            {
                actor1.enemyCollision(actor2);
                actor2.enemyCollision(actor1);
            }
            actor1.postCollision();
            actor2.postCollision();
        }
    }
    
    
    
    /**
        @return a JSON validate stringification of essential datamembers of this stage
    */
    toString()
    {
        var data = {};
        data.xSize = this.xSize;
        data.ySize = this.ySize;
        data.tile = this.tileKey;
        data.actors = this.spawn.dataLiteral;
        return JSON.stringify(data);
    }
}