class Professor extends Actor
{
    constructor(stage, x, y, key, faceDirection, team)
    {
        super(stage, x, y, key, faceDirection, team, false);
        this.ACTOR_TYPE = "professor";

        this.collidable = false;

        this.activated = false;
        this.textObject = null;;
    }

    enemyCollision(other)
    {
        if (other.ACTOR_TYPE === "player")
        {
            if (!this.activated)
            {
                this.showText();
            }
            this.sprite.setAlpha(.5);
        }
    }

    showText()
    {
        this.textObject = this.add(this.scene.add.text(this.x, this.y, "Hello world!", { fontFamily: 'Arial', fontSize: 64, color: "#00ff0"}));
    }

    reset(x, y, faceDirection, team)
    {
        super.reset(x, y, faceDirection, team);
        this.activated = false;
        this.textObject = null;
    }
}

ACTOR_TYPES.nate = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "nate", faceDirection, team);
    }
}

ACTOR_TYPES.john = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "john", faceDirection, team);
    }
}

ACTOR_TYPES.toby = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "toby", faceDirection, team);
    }
}

ACTOR_TYPES.paul = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "paul", faceDirection, team);
    }
}

ACTOR_TYPES.doug = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "doug", faceDirection, team);
    }
}