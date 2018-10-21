/**
    Actor type. This Actor does not move. This Aactor has a range, and will fire directly
    at an enemy within that range. If multiple enemies are in range, it will target the nearest one
*/
class TargetingTurret extends Turret
{
    constructor(stage, coord, ammo, direction) 
    {
        direction = direction || Direction.WEST;
        super(stage, coord, ammo, direction);

        this.ACTOR_TYPE = "targetingturret";
            
        this.fireRate = 2000;
        this.range = 300; 
        this.targeter = new TargetingSystem(this.scene, new Phaser.Point(this.x, this.y), this.scene.actors, this.teamTag, this.range);
    }

    /**
    * Handles updating this actor
    */
    action()
    {
        if (!Actor.prototype.update.call(this)){
            return;
        }

        if (this.targeter.checkTargetInRange())
        {
            this.faceDirection = this.targeter.getDirectionToTarget();
            this.updateFrame();
        }
        
        if(this.game.time.now >= this.nextFire){  
            this.nextFire += this.fireRate;
            
            if (this.targeter.acquireTarget() && this.targeter.checkTargetInRange()){
                this.fire(this.targeter.getTargetPosition());
            }
        }
    }

    /**
        Override parent method. Additionally handles setting the team of this TargetingTurret's members
    */
    setTeam(name) {
        this.targeter.tag = name;
        super.setTeam(name);
    }
}