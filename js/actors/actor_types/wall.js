/**
    Be nice... he's a very useful Actor
    
    @param stage Stage that this Wall exists on
    @param coord StageCoord the position on the Stage of this Wall
*/
class Wall extends Actor{
    constructor(stage, coord)
    {
        super(stage, coord, 'wall');

        this.ACTOR_TYPE = "wall";
        
        this.body.static = true; //He doesn't move
        
        this.targetable = false; //He can't be directly targeted
    }
}