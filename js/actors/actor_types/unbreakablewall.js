ACTOR_TYPES.unbreakablewall = class extends Actor
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "dark-wall", faceDirection, true);

        this.ACTOR_TYPE = "unbreakablewall";
        
        this.body.immovable = true; //He doesn't move
        
        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4);
        this.sprite.y = -this.sprite.height/4;

        this.collidable = true;
        this.targetable = false; //He can't be directly targeted
    }

    takeHit(){}
}