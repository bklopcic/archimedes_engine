class TileManager
{
    constructor(scene, width, height, tileKeys)
    {
        this.scene = scene;
        this.tileKeys = tileKeys;

        let testTile = this.scene.textures.get(this.tileKeys[0]).source[0];
        this.tileWidth = testTile.width;
        this.tileHeight = testTile.height;
        testTile = null;

        this.tiles = this.scene.add.renderTexture(0, 0, width, height);
        this.dataGrid = [];
    }

    resetGrid(xSize, ySize)
    {
        this.dataGrid = [];
        for (let i = 0; i < xSize; i++)
        {
            this.dataGrid[i] = [];
            for (let j = 0; j < ySize; j++)
            {
                this.dataGrid[i][j] = 0;
            }
        }
    }

    drawTiles(tileData)
    {
        for (let i = 0; i < tileData.length; i++)
        {
            for (let j = 0; j < tileData[i].length; j++)
            {
                this.tiles.draw(this.scene.add.image(xPos, yPos, this.tileKeys[0]));
            }
        }
    }

    /**
        Returns the pixel coordinate of a specified StageCoord
        
        @param {StageCoord} coord the position on the grid to retrieve the tile from
        @return Phaser.Geom.Point representing the pixel coordinate of the StageCoord
    */
   getTileAt(coord) 
   {
       return new Phaser.Geom.Point(coord.x * this.tileWidth, coord.y * this.tileHeight);
   }

   /**
       Returns a coordinate object representing a position in the grid at a specified pixel position
       
       @param x number representing the horizontal position (in pixels) of the requested Stage position
       @param y number representing the vertical position (in pixels) of the requested Stage position
       @return StageCoord
       
       TODO: Make this method account for non-zero offset
   */
   getCoordByPixels(x, y) 
   {
       const rawOffsetX = this.offsetX - (this.tileWidth/2);
       const rawOffsetY = this.offsetY - (this.tileHeight/2);
       return new StageCoord(Math.floor(x/this.tileWidth), Math.floor(y/this.tileHeight));
   }

   /**
       Checks if a specified position is within the bounds of the stage.
       
       @param coord StageCoord representing the position to be checked
       @return bool (true if in bounds, false if not)
   */
   checkInBounds(coord) 
   {
       return (coord.x >= 0 && coord.x < this.xSize && coord.y >= 0 && coord.y < this.ySize);
   }

   /**
   * Handles adding to the number of occupants at a position on the grid
   *    
   * @param coord StageCoord the position to occupy
   */
   enterTile(coord) 
   {
       this.dataGrid[coord.y][coord.x]++;
   }

   /**
       Hanldes decrementing from the number of occupants at a position on a grid
       
       @param coord StageCoord the position to unoccupy
   */
   leaveTile(coord) 
   {
       this.dataGrid[coord.y][coord.x]--;
   }

   /**
       Checks if a specified position on the grid is occupied by another actor
       
       @param coord StageCoord the position to check
       @return bool (true if empty, false otherwise)
   */
   checkIfEmpty(coord) 
   {
       return this.dataGrid[coord.y][coord.x] == 0;
   }
}