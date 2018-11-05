class GridChunkManager
{
    constructor(actorManager, data)
    {
        this.spawner = actorManager;
        this.chunkWidth = data.chunkWidth;
        this.chunkHeight = data.chunkHeight;
        this.chunks = [];

        this.activeChunkRange = 
        {
            topLeft: null,
            botttomRight: null
        }

        for (let  i = 0; i < data.chunks.length; i++)
        {
            this.chunk[i] = [];
            for (let j = 0; j < data.chunks[i].length; j++) {
                const chunkData = data.chunks[i][j];
                this.chunks[i][j] = new GridChunk(chunkData);
            }
        }
    }

    loadChunk(coord)
    {
        const chunk = this.chunks[coord.y][coord.x];
        this.spawner.loadActorsFromData(chunk.actorData);
        chunk.clearActorData();
    }

    unloadChunk(coord)
    {
         
    }

    loadChunkRange(startCoord, endCoord)
    {
        if (startCoord.x > endCoord.x || startCoord.y > endCoord.y)
        {
            throw "Invalid range parameters";
        }

        for (let i = startCoord.y; i < endCoord.y; i++)
        {
            for (let j = startCoord.x; j < endCoord.x; j++)
            {
                const idx = new StageCoord(j, i);
                if (!this.checkIdxActive(idx))
                {
                    this.loadChunk(idx);
                }
            }
        }
    }

    checkInActiveBounds(obj)
    {
        return this.checkIdxActive(this.getParentChunkIdx(obj));
    }

    checkIdxActive(coord)
    {
        return UtilFunctions.checkCoordInRange(this.activeChunkRange.topLeft, botttomRight, coord);
    }

    /**
     * gets the coordinate of the chunk that a specified object is currenlty in
     * @param {Object} obj the object to check
     * @returns StageCoord representing the chunk idx of specified object
     */
    getParentChunkIdx(obj)
    {
        const x = Math.floor(obj.x / this.chunkWidth);
        const y = Math.floor(obj.y / this.chunkHeight);
        return new StageCoord(x, y);
    }
}