/**
    Actor type. This Actor does not move. This Aactor has a range, and will fire directly
    at an enemy within that range. If multiple enemies are in range, it will target the nearest one
*/
function TargetingTurret(stage, coord, ammo, direction=Direction.WEST){
    Turret.call(this, stage, coord, ammo, direction);
        
    this.fireRate = 2000;
    this.range = 300; 
    this.targeter = new TargetingSystem(this.scene, new Phaser.Point(this.x, this.y), this.scene.actors, this.teamTag, this.range);
}

TargetingTurret.prototype = Object.create(Turret.prototype);
TargetingTurret.prototype.constructor = TargetingTurret;

TargetingTurret.prototype.ACTOR_TYPE = "targetingturret";

/**
    Override parent update. Handles updating this sprite
*/
TargetingTurret.prototype.update = function(){
    if (!Actor.prototype.update.call(this)){
        return;
    }
    
    if(this.game.time.now >= this.nextFire){  
        this.nextFire += this.fireRate;
        
        if (this.targeter.acquireTarget() != null && this.targeter.checkTargetInRange()){
            this.faceDirection = this.targeter.getDirectionToTarget();
            this.fire(this.targeter.getTargetPosition());
        }
    }
}



/**
    Override parent method. Additionally handles setting the team of this TargetingTurret's members
*/
TargetingTurret.prototype.setTeam = function(name){
    this.targeter.tag = name;
    Actor.prototype.setTeam.call(this, name);
}