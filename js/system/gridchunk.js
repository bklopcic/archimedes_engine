/**
 * This class is for storing data about actors. They are a lightweight organizational
 * tool for storing groups of actor data based on their location.
 * Chunk data can be read to add actors to the scene. After Actors are loaded, 
 * the chunk's clearActorData() method should be called to reset it for when it's time to 
 * unload it.
 */
class GridChunk
{
    constructor(chunkData)
    {
        this.actors = chunkData.actors;
        this.tiles = chunkData.tiles;
    }

    get dataLiteral()
    {
        const copy = this.clone();
        const data = {};
        data.actors = copy.actors;
        return data;
    }

    clearActorData()
    {
        this.actors = [];
    }

    addActor(actor)
    {
        this.actors.push(actor.dataLiteral);
    }

    clone()
    {
        const arrCopy = [];
        for (let i = 0; i < this.actors.length; i++) {
            arrCopy[i] = Object.assign({},this.actors[i]);
        }
        return new GridChunk({actors: arrCopy});
    }
}