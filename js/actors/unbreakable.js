ACTOR_TYPES.unbreakable = class extends ACTOR_TYPES
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "dark-wall", faceDirection, teamTag, true);

        this.ACTOR_TYPE = "unbreakablewall";
        
        this.body.immovable = true; //He doesn't move
        
        this.collidable = true;
        this.targetable = false; //He can't be directly targeted
    }

    takeHit(){}
}