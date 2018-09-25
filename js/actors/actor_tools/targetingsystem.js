/**
    This object can be used by Actors to find other actors and their positions based on given criteria. 
    
    @param position StageCoord the current position of the Actor that owns this TargetingSystem
    @param group Phaser.Group containing the Actors in on the stage with the Actor that owns this TargetingSystem
    @param tag string the teamTag property of this TargetingSystem's owner
    @param range number the targeting range of this TargetingSystem's owner (optional. Defaults to 0)
    @param target Actor the actor for this Object to start out targeting.
*/
function TargetingSystem(stage, position, group, tag, range, target){
    this.stage = stage
    this.position = position;
    this.group = group;
    this.tag = tag;
    this.range = range || 0;
    this.target = target || null;
}



/**
    Handles obtaining a target based on the specified criteria
    TODO
    NOTE: Currently targets nearest Actor with tag different from ours
*/
TargetingSystem.prototype.acquireTarget = function(){
    
    this.target = this.findClosestEnemy();
    return this.target;
}



/**
    @return StagePosition of this object's current target (or null if no target)
*/
TargetingSystem.prototype.getTargetCoord = function(){
    if (this.target != null){
        return this.target.scenePosition;
    }
    return null;
}



/**
    @return Phaser.Point of this object's current target's current position, in pixels (or null if no target)
*/
TargetingSystem.prototype.getTargetPosition = function(){
    if (this.target != null){
        return new Phaser.Point(this.target.x, this.target.y);
    }
    return null;
}



/**
    Finds the distance between two objects (any objects that have x and y properties will work.)
    NOTE: Use Phaser.Point, Actor, or Phaser.Sprite
    
    @param obj1 Object the object to measure from
    @param obj2 Object the object to measure to
    @return number
*/
TargetingSystem.prototype.getDistance = function(obj1, obj2){
    return Phaser.Math.distance(obj1.x, obj1.y, obj2.x, obj2.y);
}



/**
    Checks if one object is within a specified range of another
    NOTE: use Phaser.Point, Phaser.Sprite, or Actor
    
    @param obj1 Object the object to measure from
    @param obj2 Object the object to check against range
    @param range number the maximum acceptible distance between the two objects
    @return bool (true if in range, false otherwise)
*/
TargetingSystem.prototype.checkInRange = function(obj1, obj2, range){
    return this.getDistance(obj1, obj2) <= range;
}



/**
    Checks if this object's current target is within range. Will return false
    if there is no current target
    
    @return bool (true if in range, false otherwise)
*/
TargetingSystem.prototype.checkTargetInRange = function(){
    if (this.target)
    {
        return this.checkInRange(this.position, this.target, this.range);
    }
    return false;
}



/**
    @return the distance between this object's current position and the current target's position (or null if no target)
*/
TargetingSystem.prototype.calcDistanceToTarget = function(){
    if (this.target != null){
        return this.getDistance(this.position, this.target);
    }
    return null;
}



/**
    Handles updating this object's current position
    NOTE: this should be called anytime this object's owner changes position
    
    @param position Phaser.Point the new position of this object
*/
TargetingSystem.prototype.updatePosition = function(position){
    this.position = position;
}



/**
    Checks if a specifed actor is a targetable enemy
    
    @param obj Actor to check
    @return bool (true if enemy and targetable, false otherwise)
*/
TargetingSystem.prototype.checkIfEnemy = function(obj){
    return obj.teamTag != this.tag && obj.targetable;
}



/**
    Finds the nearest enemy
    DEV NOTE: The current version of Phaser has an implementation of this (group.getClosestTo). This method should be
    replaced by Phaser's if Arena is updated to the most recent verion of Phaser
    
    @return Actor
*/
TargetingSystem.prototype.findClosestEnemy = function(){
    var closest = null;
    var distance = null;
    this.group.forEach(function(a){
        if (this.checkIfEnemy(a)){
            if (closest == null || this.getDistance(this.position, a) < distance){
                closest = a;
                distance = this.getDistance(this.position, a);
            }
        }
    }, this);
    return closest;
}



/**
    Finds the direction of this TargetingSystem's target relative to it's current position
    
    @return Direction property
*/
TargetingSystem.prototype.getDirectionToTarget = function(){
    targetCoord = this.getTargetCoord();
    var coord = this.stage.getCoordByPixels(this.position.x, this.position.y);
    var offsetX = targetCoord.x - coord.x;
    var offsetY = targetCoord.y - coord.y;
    offsetX = offsetX == 0 ? offsetX : offsetX/Math.abs(offsetX); //so that we don't try to divide by 0...
    offsetY = offsetY == 0 ? offsetY : offsetY/Math.abs(offsetY);
    var modifyer = {x: offsetX, y:offsetY};
    
    return Direction.modifyerToDirection(modifyer);
}