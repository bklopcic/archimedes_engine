class PickupItem extends Actor
{
    constructor(stage, x, y, key)
    {
        super(stage, x, y, key, Direction.WEST, false);

        this.collideable = false;
    }

    friendlyCollision()
    {

    }

    postCollision()
    {
        this.die();
    }
}