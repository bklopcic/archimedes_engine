/**
    Be nice... he's a very useful Actor
    
    @param stage Stage that this Wall exists on
    @param coord StageCoord the position on the Stage of this Wall
*/
ACTOR_TYPES.wall = class extends Actor
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, 'wall', faceDirection, teamTag, true);

        this.ACTOR_TYPE = "wall";
        
        this.body.immovable = true; //He doesn't move
        
        this.collidable = true;
        this.targetable = false; //He can't be directly targeted
    }
}