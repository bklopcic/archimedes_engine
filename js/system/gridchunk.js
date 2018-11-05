/**
 * This class is for storing data about actors. They are a lightweight organizational
 * tool for storing groups of actor data based on their location.
 * Chunk data can be read to add actors to the scene. After Actors are loaded, 
 * the chunk's clearActorData() method should be called to reset it for when it's time to 
 * unload it.
 */
class GridChunk
{
    constructor(actors)
    {
        this.actorData = actors;
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