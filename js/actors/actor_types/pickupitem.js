ACTOR_TYPES.pickupitem = class extends Actor
{
    constructor(stage, x, y, key)
    {
        super(stage, x, y, "stoneresource", Direction.WEST, false);

        this.collidable = false;
        this.targetable = false;
        this.collected = false;
    }

    enemyCollision(other)
    {
        if (other.inventory)
        {
            this.collected = true;
            other.inventory.addItem("stone", 1);
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