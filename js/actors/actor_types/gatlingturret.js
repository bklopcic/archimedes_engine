function GatlingTurret(stage, coord, ammo, direction=Direction.WEST){
    TargetingTurret.call(this, stage, coord, ammo, direction);
    
    this.fireRate = 400;
    this.range = 15;
    
    this.maxHp = 10;
    this.hp = this.maxHp;
    
    this.tint = "#0xFF000";
}

GatlingTurret.prototype = Object.create(TargetingTurret.prototype);
GatlingTurret.prototype.constructor = GatlingTurret;

GatlingTurret.prototype.ACTOR_TYPE = "gatlingturret";