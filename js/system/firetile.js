/**
    This class extends Phaser.Sprite. FireTiles have properties to track heat that has been added to them.
    When the heat exceeds a certain amount, the tile starts burning. FireTiles also contain properties that
    dictate when their heat should be spread to the tiles around them
*/
function FireTile(game, x, y, key){
    Phaser.GameObjects.Sprite.call(this, game, x, y);
    this.setTexture(key);
    this.game.add.existing(this);
    this.anchor.set(.5,.5);
    
    
    this.burnDisplay = this.game.add.sprite(0, 0, 'fire');
    this.burnDisplay.anchor.set(.5,.5);
    this.burnDisplay.kill();
    this.addChild(this.burnDisplay);
    
    this.currentState = this.STATES.NONE;
    this.futureState = this.STATES.NONE;
    
    this.spreadChance = 0;
    
    this.tileId = FireTile.prototype.NUM_TILES_CREATED++;
}

FireTile.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
FireTile.prototype.constructor = FireTile;

//modify these to change how how fire interacts
FireTile.prototype.SPREAD_INTERVAL = 300; //the interval of time after which the fire will spread
    
FireTile.prototype.NUM_TILES_CREATED = 0;



FireTile.prototype.STATES = {
    BURNING: 0,
    BURNT: 1,
    NONE: 2,
}



/**
    Handles updating the tile's current state to reflect its future state and resetting the future state
*/
FireTile.prototype.swapStates = function(){
    this.currentState = this.futureState;
    this.futureState = this.STATES.NONE;
}



/**
    Adds a specified amount of heat to this FireTile.
    
    @param amt number the amount of heat to add
*/
FireTile.prototype.addHeat = function(amt){
    this.futureHeat+=amt;
}



/**
    Handles setting this tile on fire
*/
FireTile.prototype.startFire = function(spreadChance){
    this.futureState = this.STATES.BURNING;
    this.burnDisplay.revive();
    this.spreadChance = spreadChance;
}



/**
    Handles turning off the fire on this tile
*/
FireTile.prototype.stopFire = function(){
    this.futureState = this.STATES.BURNT;
    this.spreadChance = 0;
    this.burnDisplay.kill();
}