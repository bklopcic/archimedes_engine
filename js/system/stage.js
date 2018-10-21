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
        this.teamNames = [];

        this.spawn = new ActorManager(this.scene.add.group());
        
        if (data)
        {
            this.spawn.loadActorsFromData(data);
        }
    }

    /**
        <INTERNAL>
        Creates an actor based on a specified string. Abstract object factory pattern.
        NOTE: This is an interal method. To add an actor use stage.addActor()
        
        @param StageCoord the position on the grid to add the new actor
        @param type string the type of actor to be created
        @param direction Direction property the direction the new Actor will face to start (optional. Defaults to west)
        @return Actor the newly created Actor
    */
    createActor(coord, type, direction)
    {
        direction = direction || Direction.WEST;
        type = type.toUpperCase();
        
        switch(type){ //maybe I'll set up an enum for this at some point
            
            case "WALL":
                return new Wall(this, coord);
                
            case "TURRET":
                return new Turret(this, coord, this.propBox, direction);
                
            case "TARGETINGTURRET":
                return new TargetingTurret(this, coord, this.propBox, direction);
                
            case "SPIDER":
                return new Spider(this, coord, direction);
                
            case "DECOY":
                return new Decoy(this, coord);
                
            case "GATLINGTURRET":
                return new GatlingTurret(this, coord, this.propBox, direction);
                
            default: 
                return null;
        }
    }



    /**
        Creates a new actor of the specified type and adds it to the scene at the specified position. 
        
        @param coord StageCoord the starting position of the new Actor
        @param type string the type of actor to create
        @param team string the team to add this actor to (optional. If no team is specified a new one will be created for this Actor.).
        If a team name is passed in that has not yet been added then that team will be added to the Stage and the new Actor will 
        be a member of it.
        @param direction Direction property representing the starting face direction of the new Actor (Optional. Defaults to west)
        @return Actor a reference to the newly created Actor
    */
    addActor(coord, type, team, direction)
    {
        team = team || null;
        direction = direction || Direction.WEST;
        var actor = this.createActor(coord, type, direction);
        
        this.actors.add(actor);
            
        //actor.body.setCollisionGroup(this.actorCollisionGroup);
        //actor.body.collides([this.actorCollisionGroup, this.propCollisionGroup], this.collisionHandler, this);
        
        
        this.addToTeam(actor, team);
        
        return actor;
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