/**
    This class dynamically creates and gives easy access to Phaser.Sprites in a particle system.
    This object contains an inventory of different types of sprites. New types can be added and
    instances can requested by other sprites from this object.
    
    @param game Phaser.Game that this PropManager uses to create and store sprites
    @param collisionGroup Phaser.Physics.P2.CollisionGroup that the particles
    created by this PropManager will belong to
    @param otherCollisionGroups array of Phaser.Physics.P2.CollisionGroup that the particles
    created by this PropManager will collide with
*/
function PropManager(game, collisionGroup, otherCollisionGroups){
    this.game = game;
    this.collisionGroup = collisionGroup;
    this.otherGroups = otherCollisionGroups;
    
    this.sortGroup = this.game.add.group();
    this.particleGroups = {};
}



/**
    Handles adding new types of sprites to this object's inventory
    
    @param name string the cache key of the image to add to the group (will also be used
    to get instances from this PropManager)
    @param num number of sprites to initially add to the group (optional. Defaults to 10)
    @param collide bool whether or not this new prop type should collide with Actors (optional, defaults to false)
*/
PropManager.prototype.addProp = function(name, num=10, collide=false){
    //TODO: implement turning off collisions
    if(this.particleGroups.hasOwnProperty(name)){
        return;
    }
    
    var group = this.game.add.group(this.sortGroup); //create a new group and add it to the parent sort group
    group.collisionsOn = collide;
    
    this.particleGroups[name] = group;   
        
    group.enableBody = true;
    if (collide){
        group.physicsBodyType = Phaser.Physics.P2JS;
    }
    
    for (var i = 0; i < num; i++){
        this.createProp(name);
    }
}



/**
    Returns a prop particle of a specifed type
    NOTE: It is up to the caller to handle resetting the returned prop
    
    @return Phaser.Sprite
*/
PropManager.prototype.getProp = function(name){
    if (this.particleGroups.hasOwnProperty(name)){
        if (this.particleGroups[name].countDead() == 0){ //if we don't have any dead objects to revive, make a new one
            return this.createProp(name);
        }
        return this.particleGroups[name].getFirstDead();
    }
    return null;
}



/**
    Creates a new Phaser.Sprite in the specified group
    
    @param groupName string representing the key of the existing group in which to create the sprite
*/
PropManager.prototype.createProp = function(groupName){
    var prop = this.particleGroups[groupName].create(0,0,groupName, 0, false);
        
    prop.OBJ_TYPE = "prop";
    
    if (this.particleGroups[groupName].collisionsOn){
        prop.body.setRectangle(prop.width, prop.height);
        prop.body.setCollisionGroup(this.collisionGroup);
    
        prop.body.collides(this.otherGroups);
    }
    return prop;
}


