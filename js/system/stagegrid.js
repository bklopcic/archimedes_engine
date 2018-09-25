/**
    A 2D grid of tiles. This class handles set up and updating of tile objects
    
    @param game Phaser.Game that this StageGrid exists in
    @param xSize number the horizontal number of tiles
    @param ySize number the vertical number of tiles
    @param tileKey string the key used to crate the tiles
    @param offsetX number the vertical offset of grid from left side of the game world
    @param offsetY number the horizontal offset of the grid from the top of the game world
*/
function StageGrid(game, xSize, ySize, tileKey, offsetX=0, offsetY=0){
    this.game = game;
    this.xSize = xSize;
    this.ySize = ySize;
    this.tileKey = tileKey;
    
    //get our tile width and height directly from the image in the cache
    var testTile = this.game.cache.getImage(this.tileKey);
    this.tileWidth = testTile.width;
    this.tileHeight = testTile.height;
    testTile = null;
    
    //to account for the fact that tiles' anchor points are in their center
    this.offsetX = offsetX + (this.tileWidth/2); 
    this.offsetY = offsetY + (this.tileHeight/2);
    
    this.grid = [];
    
    this.activeTiles = [];
    
    this.dataGrid = [];
    
    this.enableGrid = true;
    this.nextBurnTime = 0;
    
    this.borderGroup = this.game.add.group();
    
    this.borderCollisionGroup = this.game.physics.p2.createCollisionGroup();
    
    this.createGrid();
}



/**
    Handles setting up the grid
*/
StageGrid.prototype.createGrid = function(){
    for (var y = 0; y < this.ySize; y++){
        this.grid[y] = [];
        this.dataGrid[y] = [];
        for(var x = 0; x < this.xSize; x++){
            var xPos = (x*this.tileWidth)+this.offsetX;
            var yPos = (y*this.tileHeight)+this.offsetY;
            
            this.grid[y][x] = new FireTile(this.game, xPos, yPos, this.tileKey);
            this.dataGrid[y][x] = 0;
        }
    }
    //this.createBorders(); TODO
}


/**
 * METHOD INCOMPLETE
 */
StageGrid.prototype.createBorders = function(){
    var topLeft = new Phaser.Point(this.offsetX-(this.tileWidth/2), this.offsetY-(this.tileHeight/2));
    var border = this.game.add.sprite(topLeft.x, topLeft.y, this.tileKey);
    border.scale.set(this.xSize, .5);
    
    this.borderGroup.addChild(border);
        
    border.body.setCollisionGroup(this.actorCollisionGroup);
    
}



StageGrid.prototype.activateTile = function(coord, spreadChance){
    if (!this.checkInBounds(coord)){
        return;
    }
    
    tile = this.getTileAt(coord.x, coord.y);
    
    for (var  i = 0; i < this.activeTiles.length; i++){
        if (tile.tileId == this.activeTiles[i].tileId){
            return;
        }
    }
    
    tile.startFire(spreadChance);
    this.activeTiles.push(tile);
}



/**
    Handles updating all the tiles in the grid
*/
StageGrid.prototype.update = function(){
    
    if (!this.enableGrid){
        return;
    }
    
    if (this.game.time.now >= this.nextBurnTime) {
        this.nextBurnTime += FireTile.prototype.SPREAD_INTERVAL;
    
        for (var i = 0; i < this.activeTiles.length; i++){

            var tile = this.activeTiles[i];

            if (tile.currentState == tile.STATES.BURNING){

                var coord = this.getCoordByPixels(tile.x, tile.y);
                var burningTiles = this.spreadFire(coord);

                tile.stopFire();

            } else if (tile.currentState == tile.STATES.BURNT){
                tile.futureState = tile.STATES.NONE;
            }
        }

        for (var k = 0; k < this.activeTiles.length; k++){
            this.activeTiles[k].swapStates();
            if (this.activeTiles[k].currentState == this.activeTiles[k].STATES.NONE){
                this.activeTiles.splice(k, 1);
            }
        }
    }
}



/**
    Handles adding heat to adjascent tiles
*/
StageGrid.prototype.spreadFire = function(coord){
    
    var spreadDirections = [Direction.NORTHWEST, Direction.NORTH, Direction.NORTHEAST, Direction.WEST,
                           Direction.EAST, Direction.SOUTHWEST, Direction.SOUTH, Direction.SOUTHEAST];
    
    var tile = this.getTileAt(coord.x, coord.y);
        
    for (var i = 0; i < spreadDirections.length; i++){
        var pos = coord.getNeighbor(spreadDirections[i]);
        
        if (this.checkInBounds(pos) && Math.random() <= tile.spreadChance){
            
            var tileToBurn = this.getTileAt(pos.x, pos.y);
            
            this.activateTile(pos, tile.spreadChance - .2);
        }
    }
}



/**
    Returns the tile at a specified position in the Stage's tile grid
    
    @param x number the horizontal position of the requested tile
    @param y number the the vertical position of the requested tile
    @return Phaser.Sprite
*/
StageGrid.prototype.getTileAt = function(x, y){
    return this.grid[y][x];
}



/**
    Returns a coordinate object representing a position in the grid at a specified pixel position
    
    @param x number representing the horizontal position (in pixels) of the requested Stage position
    @param y number representing the vertical position (in pixels) of the requested Stage position
    @return StageCoord
    
    TODO: Make this method account for non-zero offset
*/
StageGrid.prototype.getCoordByPixels = function(x, y){
    var rawOffsetX = this.offsetX - (this.tileWidth/2);
    var rawOffsetY = this.offsetY - (this.tileHeight/2);
    return new StageCoord(Math.floor((x-rawOffsetX)/this.tileWidth), Math.floor((y-rawOffsetY)/this.tileHeight));
}



/**
    Checks if a specified position is within the bounds of the stage.
    
    @param coord StageCoord representing the position to be checked
    @return bool (true if in bounds, false if not)
*/
StageGrid.prototype.checkInBounds = function(coord) {
    return (coord.x >= 0 && coord.x < this.grid[0].length && coord.y >= 0 && coord.y < this.grid.length);
}



/**
    Handles adding to the number of occupants at a position on the grid
    
    @param coord StageCoord the position to occupy
*/
StageGrid.prototype.enterTile = function(coord){
    this.dataGrid[coord.y][coord.x]++;
}



/**
    Hanldes decrementing from the number of occupants at a position on a grid
    
    @param coord StageCoord the position to unoccupy
*/
StageGrid.prototype.leaveTile = function(coord){
    this.dataGrid[coord.y][coord.x]--;
}



/**
    Checks if a specified position on the grid is occupied by another actor
    
    @param coord StageCoord the position to check
    @return bool (true if empty, false otherwise)
*/
StageGrid.prototype.checkIfEmpty = function(coord){
    return this.dataGrid[coord.y][coord.x] == 0;
}