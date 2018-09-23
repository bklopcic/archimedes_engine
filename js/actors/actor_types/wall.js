/**
    Be nice... he's a very useful Actor
    
    @param stage Stage that this Wall exists on
    @param coord StageCoord the position on the Stage of this Wall
*/
function Wall(stage, coord){
    Actor.call(this, stage, coord, 'wall');
    
    this.body.static = true; //He doesn't move
    
    this.targetable = false; //He can't be directly targeted
}

Wall.prototype = Object.create(Actor.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.ACTOR_TYPE = "wall";