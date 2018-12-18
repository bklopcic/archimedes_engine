/**
    Pretty much just a wall... but can be targeted
*/
ACTOR_TYPES.decoy = class extends Actor
{
    constructor(stage, coord)
    {
        super(stage, coord, "spider");
        this.ACTOR_TYPE = "decoy";
        
        this.body.static = true;
        
        this.targetable = true;
        
        this.tint = '#3366ff';
        
        this.maxHp = 10;
        this.hp = this.maxHp;
    }
}