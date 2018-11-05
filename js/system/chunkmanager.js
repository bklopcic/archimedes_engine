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

    setActiveRange(startIdx, endIdx, forceClean)
    {
        if (startIdx.x > endIdx.x || startIdx.y > endIdx.y)
        {
            throw "Invalid range parameters";
        }
        if (this.activeChunkRange.startIdx == startIdx && this.activeChunkRange.endIdx == endIdx)
        {
            return;
        }
        forceClean = typeof forceClean == "undefined" ? false : forceClean;
        this.activeChunkRange.startIdx = startIdx;
        this.activeChunkRange.endIdx = endIdx;

        if (forceClean)
        {
            this.cleanActors();
        }
        this.loadChunkRange(this.activeChunkRange.startIdx, this.activeChunkRange.endIdx);
    }

    loadChunk(coord)
    {
        const chunk = this.chunks[coord.y][coord.x];
        this.spawner.loadActorsFromData(chunk.actorData);
        chunk.clearActorData();
    }

    loadChunkRange(startIdx, endIdx)
    {
        if (startIdx.x > endIdx.x || startIdx.y > endIdx.y)
        {
            throw "Invalid range parameters";
        }
        
        for (let i = startIdx.y; i < endIdx.y; i++)
        {
            for (let j = startIdx.x; j < endIdx.x; j++)
            {
                const idx = new StageCoord(j, i);
                if (!this.checkIdxActive(idx))
                {
                    this.loadChunk(idx);
                }
            }
        }
    }

    cleanActors()
    {
        const actors = this.spawner.allActors;
        for (let  i = 0; i < actors.length; i++)
        {
            const actor = actors[i];
            if (actors.active && !this.checkInActiveBounds(actor))
            {
                actor.die();
                if (actor.belongsToGrid)
                {
                    const actorIdx = this.getParentChunkIdx(actor);
                    this.chunks[actorIdx.y][actorIdx.x].addActor(actor);
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