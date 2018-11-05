/**
 * This class is for storing data about actors. They are a lightweight organizational
 * tool for storing groups of actor data based on their location.
 * Chunk data can be read to add actors to the scene. After Actors are loaded, 
 * the chunk's clearActorData() method should be called to reset it for when it's time to 
 * unload it.
 */
class GridChunk
{
    constructor(data)
    {
        this.actorData = data.actors;

        this.top = data.top;
        this.left = data.left;

        this.width = data.width;
        this.height = data.height;

        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    get dataLiteral()
    {
        const obj = 
        {
            top: this.top,
            left: this.left,
            width: this.width,
            height: this.height,
            actorData: this.actorData
        };
        return obj;
    }

    /**
     * Checks whether a specified object currently exists on this chunk
     * @param {bool} obj object to be checked
     */
    contains(obj)
    {
        return obj.x >= this.left && obj.x < this.right && obj.y >= this.top && obj.y < this.bottom;
    }

    clearActorData()
    {
        this.actorData = [];
    }

    addActor(actor)
    {
        this.actorData.push(actor.dataLiteral);
    }
}