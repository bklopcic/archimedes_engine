class ActorGroup extends Phaser.GameObjects.Group
{
    /**
     * 
     * @param {*Phaser.Scene} scene the scene this group exists in
     * @param {*class} classType the class that will populate this group
     */
    constructor(scene, classType)
    {
        super(scene, {classType: classType, runChildUpdate: true});
    }
}