class ActorUI
{
    /**
     * 
     * @param {Actor} actor the actor that this ui belongs to
     */
    constructor(scene, actor)
    {
        this.actor = actor;
        this.scene = this.actor.scene;

    }
}