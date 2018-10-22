/**
 * projectile that can be fired
 */
class Bullet extends Actor
{
    constructor(stage, x, y, direction)
    {
        super(stage, x, y, "bullet", direction, false);

        this.targetable = false;
        this.collideable = true;
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