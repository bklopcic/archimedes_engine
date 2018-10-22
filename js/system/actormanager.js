/**
 * Handles creating and manging actor objects
 */
class ActorManager
{
    /**
     * 
     * @param {*Phaser.Scene} scene the phaser scene this manager exists in
     * @param {*Phaser.group} parentSortGroup the group that will be the parent for all actors (optional)
     */
    constructor(stage, parentSortGroup)
    {
        this.stage = stage;
        this.sortGroup = parentSortGroup || this.stage.scene.add.group(); //TODO: change this to container

        this.actorGroups = {};
        this.teamNames = [];
    }

    get dataLiteral()
    {
        const dataArr = [];
        for (let group in this.actorGroups)
        {
            this.actorGroups[group].getChildren().forEach(function(a)
            {
                dataArr.push(a.getDataLiteral());
            });
        }
        return dataArr;
    }

    /**
        Handles adding a team to the stage. 
        
        @param name string the name of the team to be added (optional. If team name not specified id number will be assigned (as a string))
        @return string the name of the team that was added
    */
    addTeam(name)
    {
        if (!name)
        {
            name = this.teamNames.length.toString();
        } 
        else if (typeof name != "string")
        {
            name = name.toString();
        }
        this.teamNames.push(name);
        return name;
    }

    /**
         Makes an actor a member of a team. If the specified team does not exist, creates a new team 
        with the specified name and adds the actor to it.
        
        @param actor Actor the Actor object to be added to a team
        @param teamName string the name of the team to add the Actor to
    */
    addActorToTeam(actor, teamName)
    {
        if (!this.checkTeamExists(teamName))
        {
            teamName = this.addTeam(teamName);
        }
        actor.setTeam(teamName);
    }

    /**
         Checks if a specifed team has been added to the stage
        
        @param name string team name to check
        @return bool
    */
    checkTeamExists(name){
        for (var i = 0; i < this.teamNames.length; i++)
        {
            if(this.teamNames[i] == name)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Creates a new actor group
     * 
     * @param {string} name the name of this type of actor
     * @param {obj} num (optional) the settings to apply to this group and its members
     */
    addActorGroup(name, classType)
    {
        if(this.actorGroups.hasOwnProperty(name))
        {
            return;
        }        
        //create a new group and add it to the parent sort group
        //TODO: add new group to container (for sorting)
        this.actorGroups[name] = new ActorGroup(this.stage.scene, classType);
        for (const group in this.actorGroups) {
            this.stage.scene.physics.add.overlap(this.actorGroups[name], this.actorGroups[group], this.stage.collisionHandler, null, this.stage);
        }
    }

    /**
        Sets up the grid based on JSON data
    */
    loadActorsFromData(data)
    {
        for (var i = 0; i < data.actors.length; i++)
        {
            const actor = data.actors[i];
            this.spawnActor(actor.type, actor.x, actor.y, actor.faceDirection, actor.team);
        }
    }

    /**
        Creates a new Phaser.Sprite in the specified group
        
        @param {string} actorType representing the key of the existing group in which to create the sprite
    */
    instantiateActor(actorType, x, y, faceDirection, num)
    {
        num = num || 1;
        for (let i = 0; i < num; i++)
        {
            const actor = new ACTOR_TYPES[actorType](this.stage, x, y, faceDirection);
            actor.setActive(false);
            this.actorGroups[actorType].add(actor, true); //second arg adds actor to scene
        }
        return this.actorGroups[actorType].getFirstDead();
    }

    spawnActor(key, x, y, direction, team)
    {
        if (!this.actorGroups.hasOwnProperty(key))
        {
            this.addActorGroup(key, ACTOR_TYPES[key]);
        }
        let actor = this.actorGroups[key].getFirstDead();
        if (!actor)
        {
            actor = this.instantiateActor(key, x, y, direction);
        }
        this.addActorToTeam(actor, team);
        actor.reset(x, y, direction);
        return actor;
    }

    spider(x, y, direction, team)
    {
        return this.spawnActor("spider", x, y, direction, team);
    }

    wall(x, y, direction, team)
    {
        return this.spawnActor("wall", x, y, direction, team);
    }

    turret(x, y, direction, team)
    {
        return this.spawnActor("turret", x, y, direction, team);
    }

    bullet(x, y, direction, team)
    {
        return this.spawnActor("bullet", x, y, direction, team);
    }
}

var ACTOR_TYPES = 
{
    "spider": Spider, 
    "wall": Wall, 
    "turret": Turret,
    "gatlingturret": GatlingTurret,
    "decoy": Decoy,
    "bullet": Bullet
}