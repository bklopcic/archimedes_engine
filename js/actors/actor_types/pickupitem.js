class PickupItem extends Actor
{
    constructor(stage, x, y, key, faceDirection, teamTag)
    {
        super(stage, x, y, key, faceDirection, teamTag, false);

        this.collidable = false;
        this.targetable = false;
        this.collected = false;
        this.pickupType = "pickup Item"
    }

    enemyCollision(other)
    {
        if (other.inventory)
        {
            this.collected = true;
            other.inventory.addItem(this.pickupType, 1);
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

ACTOR_TYPES.log = class extends PickupItem
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "log", faceDirection, teamTag);

        this.pickupType = "log";
    }
}

ACTOR_TYPES.stone = class extends PickupItem
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "stoneresource", faceDirection, teamTag);

        this.pickupType = "stone";
    }
}