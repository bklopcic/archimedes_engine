class Resource extends Actor
{
    constructor(stage, x, y, key)
    {
        super(stage, x, y, "rockpile");

        this.collideable = true;
        this.targetable = false;
        
        this.maxHp = 5;
        this.hp = this.maxHp;
        
        this.body.immovable = true;
        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, 0);

        this.addUI();
    }

    postCollision()
    {
        if (this.hp <= 0)
        {
            this.spawnRocks();
            this.die();
        }
    }

    spawnRocks()
    {
        const num = genRandInt(1, 4);
        for (let i = 0; i < num; i++)
        {
            const randX = genRandInt(0, 2) > 0 ? -1 : 1;
            const randY = genRandInt(0, 2) > 0 ? -1 : 1;
            this.stage.spawn.spawnActor("pickupitem", this.x + (genRandInt(0,8) * randX), this.y + (genRandInt(0,8) * randY), Direction.WEST, this.teamTag);
        }
    }
}