/**
    This is an extnesion of the actor class that will fire bullets at a fixed interval in a set direction
    
    @param stage Stage that hisTurret belongs to
    @param coord StageCoord this Turret's position on the stage
    @param ammo PropManager that will supply this Turret with sprites for bullets
    @param direction Direction property the facing (and firing) direction of this turret (optional. Default to west)
    @param fireRate number (in miliseconds) the time between each shot of this turret (optional. Defaults to 1000)
*/
function Turret(stage, coord, ammo, direction=Direction.WEST){
    Actor.call(this, stage, coord, "turret", direction);
    
    this.ammoBox = ammo;
    this.ammoBox.addProp('bullet', 100, true);
    
    this.body.static = true;
    
    this.targetable = true;
    
    this.hp = 7;
    this.fireRate = 3000;
    this.bulletSpeed = 250;
    this.nextFire = this.game.time.now + this.fireRate;
}

Turret.prototype = Object.create(Actor.prototype);
Turret.constructor = Turret;

Turret.prototype.ACTOR_TYPE = "turret";

/**
    Handles updating this turret 
*/
Turret.prototype.update = function(){
    if (!Actor.prototype.update.call(this)){
        return;
    }
    
    if (this.game.time.now >= this.nextFire){
        this.nextFire += this.fireRate;
        
        var modifyerX = Direction.modifyer[this.faceDirection].x;
        var modifyerY = Direction.modifyer[this.faceDirection].y;
        
        //standard turret calculates its target as two tiles in front of it in its facing direction
        var target = new Phaser.Point(this.x +((this.width*2) * modifyerX), this.y+((this.height*2) * modifyerY));
        
        this.fire(target);        
    }
}



/**
    Handles firing. The position that the bullet will be fired from is the tile adjascent to
    the Turret in the direction its facing
    
    @param target Phaser.Point (or any object with x and y properties) to fire the bullet at
*/
Turret.prototype.fire = function(target){
    if (target == null || typeof target == "undefined"){
        return;
    }
    
    var bullet = this.ammoBox.getProp('bullet');
    bullet.OBJ_TYPE = "bullet";
    bullet.teamTag = this.teamTag;
    bullet.attackDamage = 1;
    var modifyerX = Direction.modifyer[this.faceDirection].x;
    var modifyerY = Direction.modifyer[this.faceDirection].y;
    
    //yes... the +2 is necessary... just trust me on this one (rounding errors)
    bullet.reset(this.x +(((this.width/2)+(bullet.width/2)+3) * modifyerX), this.y+(((this.height/2)+(bullet.height/2)+3) * modifyerY));
    this.game.physics.arcade.moveToObject(bullet, target, this.bulletSpeed);
}