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
        Resolves collisions between two bodies on the stage (Actor or prop)
    */
    collisionHandler(obj1, obj2)
    {
        obj1 = obj1.sprite; 
        obj2 = obj2.sprite;
        if(obj2.OBJ_TYPE == "bullet" && obj2.alive && obj1.OBJ_TYPE == "actor")
        {
            if (obj2.teamTag != obj1.teamTag)
            {
                obj1.takeHit(obj2.attackDamage);
            } 
            obj2.kill();
        } 
        else if (obj2.OBJ_TYPE == "actor" && obj1.OBJ_TYPE == "actor")
        {
            obj1.collideWithActor(obj2);
        }
    }
    
    
    
    /**
        @retutn a JSON validate stringification of essential datamembers of this stage
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