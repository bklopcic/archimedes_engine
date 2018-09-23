/**
    This class reads data from a controller object and displays it graphically.
    
    @param player SpiderController the controller that this HUD will get it's information from
*/
function HUD(player){
    this.player = player
    this.game = this.player.game;
    
    this.healthText = this.game.add.text(50, 600, "Health: "+this.player.hp+"/"+this.player.maxHp);
    this.healthText.fill = "#ffffff";
    
    this.buildingText = this.game.add.text(350, 600, "Selected building: " + this.player.buildings[this.player.selectedBuilding]);
    this.buildingText.fill = "#ffffff";
}


/**
    Handles updating display elements to reflect player's current state
*/
HUD.prototype.update = function(){
    this.healthText.text = "Health: " + this.player.hp + "/" + this.player.maxHp;
    
    this.buildingText.text = "Selected building: " + this.player.buildings[this.player.selectedBuilding];
}