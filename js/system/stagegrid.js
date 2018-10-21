/**
    A 2D grid of tiles. This class handles set up and updating of tile objects
    
    @param game Phaser.Game that this StageGrid exists in
    @param xSize number the horizontal number of tiles
    @param ySize number the vertical number of tiles
    @param tileKeys string array the keys used to crate the tiles
    @param offsetX number the vertical offset of grid from left side of the game world (optional)
    @param offsetY number the horizontal offset of the grid from the top of the game world (optional)
*/
class StageGrid 
{
    constructor(scene, xSize, ySize, tileKeys, offsetX, offsetY) 
    {
        this.scene = scene;
        this.xSize = xSize;
        this.ySize = ySize;
        this.tileKeys = tileKeys;
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        
        //get our tile width and height directly from the image in the cache
        let testTile = this.scene.textures.get(this.tileKeys[0]).source[0];
        console.log(testTile);
        this.tileWidth = testTile.width;
        this.tileHeight = testTile.height;
        testTile = null;
        
        //to account for the fact that tiles' anchor points are in their center
        this.offsetX = offsetX + (this.tileWidth/2); 
        this.offsetY = offsetY + (this.tileHeight/2);
        
        this.grid = []; //TODO: eliminate this and everything having to do with it
        
        this.activeTiles = [];
        
        this.dataGrid = [];
        
        this.enableGrid = true;
        this.nextBurnTime = 0;
        
        //this.borderGroup = this.scene.add.group();
                
        this.createGrid();
    }

    /**
        Handles setting up the grid
    */
    createGrid() 
    {
        for (let y = 0; y < this.ySize; y++)
        {
            this.grid[y] = [];
            this.dataGrid[y] = [];
            for(let x = 0; x < this.xSize; x++)
            {
                const xPos = (x*this.tileWidth)+this.offsetX;
                const yPos = (y*this.tileHeight)+this.offsetY;
                
                this.grid[y][x] = this.scene.add.image(xPos, yPos, this.tileKeys[0]);
                this.dataGrid[y][x] = 0;
            }
        }
        //this.createBorders(); //TODO
    }

    /**
     * METHOD INCOMPLETE
     */
    createBorders() 
    {
        const topLeft = new Phaser.Point(this.offsetX-(this.tileWidth/2), this.offsetY-(this.tileHeight/2));
        const border = this.scene.add.sprite(topLeft.x, topLeft.y, this.tileKey);
        border.scale.set(this.xSize, .5);
        
        this.borderGroup.addChild(border);
            
        border.body.setCollisionGroup(this.actorCollisionGroup);
        
    }


    /**
        Handles updating all the tiles in the grid
    */
    update() 
    {
        
    }


    /**
        Returns the tile at a specified position in the Stage's tile grid
        
        @param {StageCoord} coord the position on the grid to retrieve the tile from
        @return Phaser.Sprite
    */
    getTileAt(coord) 
    {
        return this.grid[coord.y][coord.x];
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
        return new StageCoord(Math.floor((x-rawOffsetX)/this.tileWidth), Math.floor((y-rawOffsetY)/this.tileHeight));
    }

    /**
        Checks if a specified position is within the bounds of the stage.
        
        @param coord StageCoord representing the position to be checked
        @return bool (true if in bounds, false if not)
    */
    checkInBounds(coord) 
    {
        return (coord.x >= 0 && coord.x < this.grid[0].length && coord.y >= 0 && coord.y < this.grid.length);
    }

    /**
        Handles adding to the number of occupants at a position on the grid
        
        @param coord StageCoord the position to occupy
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