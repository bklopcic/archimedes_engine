class Resource extends Actor
{
    constructor(stage, x, y, key)
    {
        super(stage, x, y, "rockpile");

        this.collidable = true;
        this.targetable = false;
        
        this.maxHp = 14;
        this.hp = this.maxHp;
        
        this.body.immovable = true;
        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, 0);

        this.ACTOR_TYPE = "resource";
        this.addGUI();
    }

    postCollision()
    {
        if (this.hp <= 0)
        {
            this.spawnRocks();
            this.die();
        }
    }

    spawnRocks(num)
    {
        num = num || UtilFunctions.genRandInt(1, 4); //variable reward
        for (let i = 0; i < num; i++)
        {
            const randX = this.x + UtilFunctions.genRandInt(-this.body.width/2, this.body.width/2);
            const randY = this.y + UtilFunctions.genRandInt(-this.body.height/2, this.body.height/2);
            this.stage.spawn.spawnActor("pickupitem", randX, randY, Direction.WEST, this.teamTag);
        }
    }
}