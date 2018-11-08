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
    }

    checkTrigger()
    {
        
    }

    update()
    {

    }
}