class PickupItem extends Actor
{
    constructor(stage, x, y, key)
    {
        super(stage, x, y, "stoneresource", Direction.WEST, false);

        this.collideable = false;
        this.targetable = false;
        this.collected = false;
    }

    enemyCollision(other)
    {
        if (other.ACTOR_TYPE == "player")
        {
            this.collected = true;
        }
    }

    postCollision()
    {
        if (this.collected)
        {
            this.die();
        }
    }

    reset(x, y, direction)
    {
        super.reset(x, y, direction);
        this.collected = false;
    }
}