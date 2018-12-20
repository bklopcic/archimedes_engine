class resource extends Actor
{
    constructor(stage, x, y, key, faceDirection, teamTag)
    {
        super(stage, x, y, key, faceDirection, teamTag, true);

        this.collidable = true;
        this.targetable = false;
        
        this.maxHp = 14;
        this.hp = this.maxHp;
        
        this.body.immovable = true;
        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, 0);

        this.ACTOR_TYPE = "resource";
        this.resource = "stone";
        this.addGUI();
    }

    postCollision()
    {
        if (this.hp <= 0)
        {
            this.spawnResources();
            this.die();
        }
    }

    spawnResources(num)
    {
        num = num || UtilFunctions.genRandInt(1, 4); //variable reward
        for (let i = 0; i < num; i++)
        {
            const randX = this.x + UtilFunctions.genRandInt(-this.body.width/2, this.body.width/2);
            const randY = this.y + UtilFunctions.genRandInt(-this.body.height/2, this.body.height/2);
            this.stage.spawn.spawnActor(this.resource, randX, randY, Direction.WEST, this.teamTag);
        }
    }
}

ACTOR_TYPES.treeresource = class extends resource
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "tree", faceDirection, teamTag);
        this.ACTOR_TYPE = "treeresource";

        this.body.setCircle(15 , -14, -15);
        this.sprite.y -= this.sprite.height * .33;
        this.resource = "log";
    }
}

ACTOR_TYPES.stoneresource = class extends resource
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "rockpile", faceDirection, teamTag);
        this.ACTOR_TYPE = "stoneresource";
        this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
        this.sprite.y -= 36;
        this.resource = "stone";
    }
}