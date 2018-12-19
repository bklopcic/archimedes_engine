ACTOR_TYPES.eraser = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "", Direction.WEST, false);
        this.sprite.destroy();

        this.collidable = false;

        this.body.setSize(this.stage.tileWidth, this.stage.tileHeight);

        this.ticks = 0;
        console.log(this.scene);
    }

    friendlyCollision(other)
    {
        other.die();
    }

    enemyCollision(other)
    {
        other.die();
    }

    postCollision()
    {
        this.die();
    }

    action()
    {
        if (this.ticks > 1)
        {
            this.die();
        }
        this.ticks++;
    }
}