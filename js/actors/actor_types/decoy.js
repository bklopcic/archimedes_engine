/**
    Pretty much just a wall... but can be targeted
*/
function Decoy(stage, coord){
    Actor.call(this, stage, coord, 'spider');
    
    this.body.static = true;
    
    this.targetable = true;
    
    this.tint = '#3366ff';
    
    this.maxHp = 10;
    this.hp = this.maxHp;
}

Decoy.prototype = Object.create(Actor.prototype);
Decoy.prototype.constructor = Decoy;

Decoy.prototype.ACTOR_TYPE = "decoy";