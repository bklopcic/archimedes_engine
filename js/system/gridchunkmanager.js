class GridChunkManager
{
    constructor(stage, data)
    {
        this.stage = stage;
        this.chunkWidth = data.chunkWidth;
        this.chunkHeight = data.chunkHeight;
        this.chunks = [];

        this.debugDrawer = null;

        this.activeChunkRange = 
        {
            startIdx: new StageCoord(-1,-1),
            endIdx: new StageCoord(-1,-1)
        }

        for (let  i = 0; i < data.chunks.length; i++)
        {
            this.chunks[i] = [];
            for (let j = 0; j < data.chunks[i].length; j++)
            {
                const chunkData = data.chunks[i][j];
                this.chunks[i][j] = new GridChunk(chunkData);
            }
        }
    }

    get maxIdx()
    {
        return new StageCoord(this.chunks[0].length, this.chunks.length);
    }

    setActiveRange(startIdx, endIdx, forceClean)
    {
        if (startIdx.x > endIdx.x || startIdx.y > endIdx.y)
        {
            throw "Invalid range parameters";
        }

        //validate range to confine to existing chunks
        startIdx.x = startIdx.x < 0 ? 0 : startIdx.x;
        startIdx.y = startIdx.y < 0 ? 0 : startIdx.y;
        const max = this.maxIdx;
        endIdx.x = endIdx.x > max.x ? max.x : endIdx.x;
        endIdx.y = endIdx.y > max.y ? max.y : endIdx.y;

        if (this.activeChunkRange.startIdx.compareCoord(startIdx) && this.activeChunkRange.endIdx.compareCoord(endIdx))
        {
            return;
        }
        forceClean = typeof forceClean === "undefined" ? false : forceClean;
        
        if (forceClean)
        {
            this.cleanActors(startIdx, endIdx);
        }
        this.loadChunkRange(startIdx, endIdx);
        this.activeChunkRange.startIdx = startIdx;
        this.activeChunkRange.endIdx = endIdx;

        if (this.debugDrawer)
        {
            this.debugDraw();
        }
    }

    loadChunk(coord)
    {
        const chunk = this.chunks[coord.y][coord.x];
        this.stage.spawn.loadActorsFromData(chunk.actorData);
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
                if (!this.checkIdxActive(idx) && this.checkIdxExists(idx))
                {
                    this.loadChunk(idx);
                }
            }
        }
    }

    cleanActors(startIdx, endIdx)
    {
        const actors = this.stage.spawn.allActors;
        for (let i = 0; i < actors.length; i++)
        {
            const actor = actors[i];
            let inRange;
            
            if (typeof startIdx === "undefined" || typeof endIdx === "undefined")
            {
                inRange = this.checkInActiveBounds(actor);
            }
            else
            {
                inRange = UtilFunctions.checkCoordInRange(startIdx, endIdx, this.getParentChunkIdx(actor));
            }
            if (actor.active && !inRange)
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

    cleanFromRange(startIdx, endIdx)
    {
        const actors = this.stage.spawn.allActors;
        for (let i = 0; i < actors.length; i++)
        {
            const actor = actors[i];
            const inRange = UtilFunctions.checkCoordInRange(startIdx, endIdx, this.getParentChunkIdx(actor));
            if (actors.active && !inRange)
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
        return UtilFunctions.checkCoordInRange(this.activeChunkRange.startIdx, this.activeChunkRange.endIdx, coord);
    }

    checkIdxExists(coord)
    {
        return coord.x > -1 && coord.y > -1 && coord.x < this.chunks[0].length && coord.y < this.chunks.length;
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

    startDebug()
    {
        this.debugDrawer = this.stage.scene.add.graphics({ fillStyle: { color: 0x0000aa }, lineStyle: { color: 0x0033aa } });
    }

    stopDebug()
    {
        this.debugDrawer.clear();
        this.debugDrawer.destroy();
        this.debugDrawer = null;
    }

    debugDraw()
    {
        this.debugDrawer.clear();

        for (let i = this.activeChunkRange.startIdx.y; i < this.activeChunkRange.endIdx.y; i++)
        {
            for (let j = this.activeChunkRange.startIdx.x; j < this.activeChunkRange.endIdx.x; j++)
            {
                const idx = new StageCoord(j, i);
                
                if (this.debugDrawer)
                {
                    this.debugDrawer.strokeRect(idx.x*this.chunkWidth, idx.y*this.chunkHeight, this.chunkWidth, this.chunkHeight);
                }
            }
        }
    }
}