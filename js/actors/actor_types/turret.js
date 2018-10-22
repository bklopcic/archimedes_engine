/**
    This is an extnesion of the actor class that will fire bullets at a fixed interval in a set direction
    
    @param stage Stage that hisTurret belongs to
    @param coord StageCoord this Turret's position on the stage
    @param ammo PropManager that will supply this Turret with sprites for bullets
    @param direction Direction property the facing (and firing) direction of this turret (optional. Default to west)
    @param fireRate number (in miliseconds) the time between each shot of this turret (optional. Defaults to 1000)
*/
class Turret extends Actor
{
    constructor(stage, x, y, direction) 
    {
        direction = direction || Direction.WEST;
        super(stage, x, y, "crossbow", direction);

        this.ACTOR_TYPE = "turret";

        this.faceFrames = [7, 15, 23, 31, 39, 47, 55, 63];
                
        this.targetable = true;
        this.collideable = true;
        this.body.immovable = true;
        
        this.hp = 7;
        this.fireRate = 3000;
        this.bulletSpeed = 250;
        this.attackDamage = 2;
        this.canFire = false;


        this.updateFrame();
    }

    reset(x, y, faceDirection)
    {
        super.reset(x, y, faceDirection);

        this.canFire = false;
        this.hp = 7;

        this.setFireEvent();
    }

    /**
        Handles updating this turret 
    */
    action()
    {
        if (this.canFire)
        {
            this.canFire = false;
            this.setFireEvent();            
            const modifyerX = Direction.modifyer[this.faceDirection].x;
            const modifyerY = Direction.modifyer[this.faceDirection].y;
            
            //standard turret calculates its target as two tiles in front of it in its facing direction
            const target = new Phaser.Geom.Point(this.x +((this.width*2) * modifyerX), this.y+((this.height*2) * modifyerY));
            
            this.fire(target);        
        }
    }

    setFireEvent()
    {
        this.scene.time.addEvent({delay: this.fireRate, callback: function(){this.canFire = true}, callbackScope: this});
    }

    /**
        Handles firing. The position that the bullet will be fired from is the tile adjascent to
        the Turret in the direction its facing
        
        @param target Phaser.Point (or any object with x and y properties) to fire the bullet at
    */
    fire(target)
    {
        if (!target)
        {
            return;
        }
        const bullet = this.stage.spawn.bullet(0, 0, this.faceDirection, this.teamTag);
        const modifyerX = Direction.modifyer[this.faceDirection].x;
        const modifyerY = Direction.modifyer[this.faceDirection].y;
        bullet.setPosition(this.x +(((this.width/2)+(bullet.width/2)+3) * modifyerX), this.y+(((this.height/2)+(bullet.height/2)+3) * modifyerY));
        bullet.attackDamage = this.attackDamage;
        
        this.scene.physics.moveToObject(bullet, target, this.bulletSpeed);
    }

    updateFrame()
    {
        //this should be taken care of by parent class
        this.setFrame(this.faceFrames[this.faceDirection -1]);
    }
}