class ChunkingController
{
    constructor(chunker, focalObject)
    {
        this.chunker = chunker;
        this.focalObject = focalObject;

        this.triggerPaddingX = 75;
        this.triggerPaddingY = 50;

        this.triggerBounds = 
        {
            top: new StageCoord(0, 0),
            bottom: new StageCoord(0, 0)
        };

        this.debugDrawer = null;

        this.setBoundaries();
    }

    setFocalObject(obj)
    {
        this.focalObject = obj;
        this.setBoundaries();
    }

    setBoundaries()
    {
        const centerChunk = this.chunker.getParentChunk(this.focalObject);

        if (centerChunk.x - 1 >= 0)
        {
            this.triggerBounds.top.x = (centerChunk.x * this.chunker.chunkWidth) + this.chunker.chunkWidth/2 - this.triggerPaddingX;
        }
        else
        {
            this.triggerBounds.top.x = 0;
        }

        if (centerChunk.y - 1 >= 0)
        {
            this.triggerBounds.top.y = (centerChunk.y * this.chunker.chunkHeight) + this.chunker.chunkHeight/2 - this.triggerPaddingY;
        }
        else
        {
            this.triggerBounds.top.y = 0;
        }
        
        if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x + 1, centerChunk.y)))
        {
            this.triggerBounds.bottom.x = (centerChunk.x * this.chunker.chunkWidth) + this.chunker.chunkWidth/2 + this.triggerPaddingX;
        }
        else
        {
            this.triggerBounds.bottom.x = (centerChunk.x + 1) * this.chunker.chunkWidth;
        }

        if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x, centerChunk.y + 1)))
        {
            this.triggerBounds.bottom.y = (centerChunk.y * this.chunker.chunkHeight) + this.chunker.chunkHeight/2 + this.triggerPaddingY;
        }
        else
        {
            this.triggerBounds.bottom.y = (centerChunk.y + 1) * this.chunker.chunkHeight;
        }

        if (this.debugDrawer)
        {
            this.debugDraw();
        }
    }

    checkTrigger()
    {
        return !UtilFunctions.checkCoordInRange(this.triggerBounds.top, this.triggerBounds.bottom, new StageCoord(this.focalObject.x, this.focalObject.y));
    }

    update()
    {
        //If object has crossed trigger bounds, reset bounds, load/unload appropriate chunks
        if (this.checkTrigger())
        {
            this.setBoundaries();
            const centerChunk = this.chunker.getParentChunk(this.focalObject);
            this.chunker.setActiveRange(new StageCoord(centerChunk.x - 1, centerChunk.y -1), new StageCoord(centerChunk.x + 1, centerChunk.y + 1), true);
        }
    }

    startDebug()
    {
        this.debugDrawer = this.stage.scene.add.graphics({ fillStyle: { color: 0x0000aa }, lineStyle: { color: 0xaa8800 } });
        this.setBoundaries();
    }

    stopDebug()
    {
        this.debugDrawer.clear();
        this.debugDrawer.destroy();
        this.debugDrawer = null;
    }

    debugDraw()
    {
        const x = this.triggerBounds.top.x;
        const y = this.triggerBounds.top.y;
        const w = this.triggerBounds.bottom.x - x;
        const h = this.triggerBounds.bottom.y - y;
        this.debugDrawer.strokeRect(x, y, w, h);
    }
}