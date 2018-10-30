class PlayerAttack extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "", Direction.WEST, false);
        this.sprite.destroy();

        this.collideable = false;

        this.body.setSize(this.stage.tileWidth, this.stage.tileHeight);
    }

    friendlyCollision(other)
    {
        other.heal(2);
    }

    enemyCollision(other)
    {
        other.takeHit(this.attackDamage);
    }

    postCollision()
    {
        this.die();
    }
}