/**
    Simply defined, the stage class is a place for actors to interact. This class defines the environment
    in which the actors will exist. The stage is in charge of handling all actor interactions (collisions, etc)
*/
class Stage
{
    /**
     * @param scene Phaser.scene that this Stage belongs to
     * @param data Object containing the information to be used for stage setup
     */
    constructor(scene, data)
    {       
        this.scene = scene;
        this.dataGrid = [];

        let testTile = this.scene.textures.get("tile").source[0];
        this.tileWidth = testTile.width;
        this.tileHeight = testTile.height;
        testTile = null;

        this.spawn = new ActorManager(this, this.scene.add.group());
        this.chunker = new GridChunkManager(this, data);

        this.createGrid();
    }

    get dataLiteral()
    {
        return this.chunker.generateData();
    }

    update()
    {
    }

    /**
     * resolves collisions between actors by the following ruleset:
     *      - actors' collision handlers will only be called if at least one actor is collideable
     * 
     *      - if both actors are collideable, collision physics will be applied, otherwise they will simply overlap
     * 
     *      - if colliding actors are on the same team, their internal friendlyCollision() methods will be
     *        called in turn, passing in a reference to the other actor
     * 
     *      - if the actors are not on the same team, enemyCollision() wil be called instead, also passing a reference
     * 
     *      - each actor will have postCollision() called after either enemyCollision or friendlyCollision has been
     *        invoked on both actors
    */
    collisionHandler(actor1, actor2)
    {
        if (actor1.collidable || actor2.collidable)
        {
            if (actor1.collidable && actor2.collidable)
            {
                this.scene.physics.collide(actor1, actor2); //apply collision physics
            }
            
            if (actor1.teamTag == actor2.teamTag)
            {
                actor1.friendlyCollision(actor2);
                actor2.friendlyCollision(actor1);
            }
            else
            {
                actor1.enemyCollision(actor2);
                actor2.enemyCollision(actor1);
            }
            actor1.postCollision();
            actor2.postCollision();
        }
    }

    collideBounds(actorBody)
    {
        actorBody.gameObject.collideBounds();
    }

    /**
        Handles setting up the grid
    */
   createGrid() 
   {
       for (let y = 0; y < this.ySize; y++)
       {
           this.dataGrid[y] = [];
           for(let x = 0; x < this.xSize; x++)
           {
               const xPos = (x*this.tileWidth);
               const yPos = (y*this.tileHeight);
               
               //this.tiles.draw(this.scene.add.image(xPos, yPos, this.tileKeys[0]));
               this.dataGrid[y][x] = 0;
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
   */
   getCoordByPixels(x, y) 
   {
       const rawOffsetX = (this.tileWidth/2);
       const rawOffsetY = (this.tileHeight/2);
       return new StageCoord(Math.floor(x/this.tileWidth), Math.floor(y/this.tileHeight));
   }

   /**
       Checks if a specified position is within the bounds of the stage.
       
       @param coord StageCoord representing the position to be checked
       @return bool (true if in bounds, false if not)
   */
   checkInBounds(coord) 
   {
       return true; //(coord.x >= 0 && coord.x < this.xSize && coord.y >= 0 && coord.y < this.ySize);
   }

   /**
   * Handles adding to the number of occupants at a position on the grid
   *    
   * @param coord StageCoord the position to occupy
   */
   enterTile(coord) 
   {
       //this.dataGrid[coord.y][coord.x]++;
   }

   /**
       Hanldes decrementing from the number of occupants at a position on a grid
       
       @param coord StageCoord the position to unoccupy
   */
   leaveTile(coord) 
   {
       //this.dataGrid[coord.y][coord.x]--;
   }

   /**
       Checks if a specified position on the grid is occupied by another actor
       
       @param coord StageCoord the position to check
       @return bool (true if empty, false otherwise)
   */
   checkIfEmpty(coord) 
   {
       return true; return this.dataGrid[coord.y][coord.x] == 0;
   }

    toString()
    {
        return this.chunker.toString();
    }
}