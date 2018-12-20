ACTOR_TYPES.eraser = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "", Direction.WEST, false);
        this.sprite.destroy();

        this.collidable = true;

        this.body.setSize(this.stage.data.tileWidth, this.stage.data.tileHeight);

        this.old = false;
    }

    friendlyCollision(other)
    {
        other.die();
        console.log(other);
    }

    enemyCollision(other)
    {
        other.die();
    }

    action()
    {
        if (this.old)
        {
            this.die();
        }
        this.old = true;
    }

    reset(x, y)
    {
        super.reset(x, y);
        this.ticks = 0;
    }
}