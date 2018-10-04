class GatlingTurret extends TargetingTurret
{
    
    constructor(stage, coord, ammo, direction=Direction.WEST)
    {
        super(stage, coord, ammo, direction);
        this.ACTOR_TYPE = "gatlingturret";
        
        this.fireRate = 400;
        this.range = 15;
        
        this.maxHp = 10;
        this.hp = this.maxHp;
        
        this.tint = "#0xFF000";
    }
}