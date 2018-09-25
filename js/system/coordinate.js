/**
    Represents a position on the stage
    
    @param x number representing the horizontal position
    @param y number representing the veritical position
*/
class StageCoord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
        Returns the coordinate of the tile in a specified direction from this tile
        
        @param direction Direction property
    */
    getNeighbor(direction) {
        return new StageCoord(this.x + Direction.modifyer[direction].x, this.y + Direction.modifyer[direction].y);
    }

    /**
        checks if a StageCoord is equal to this one.
        NOTE: compares the property values, not whether the objects are physically the same
        
        @param coord StageCoord the coordinate to check
        @return bool (true if same, false otherwise)
    */
    compareCoord(coord) {
        return this.x == coord.x && this.y == coord.y;
    }
}