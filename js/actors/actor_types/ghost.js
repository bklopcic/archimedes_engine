ACTOR_TYPES.ghost = class extends Actor
{
    constructor(stage, x, y, faceDirection, teamTag)
    {
        super(stage, x, y, "ghost", faceDirection, teamTag, false);

        this.ACTOR_TYPE = "ghost";
        this.sprite.setScale(.25, .25);
        this.body.setSize(75, 75);
        this.body.setOffset(-(this.sprite.width/2) * .25, (-this.sprite.height/2)*.25);

        this.targeter = new TargetingSystem(this.stage, new Phaser.Geom.Point(this.x, this.y), this.teamTag, 200, null);
        this.tweening = false;
    }

    action()
    {
        if (!this.targeter.target)
        {
            this.findPlayer();
        }
        else
        {
            if (!this.tweening && this.targeter.checkTargetInRange())
            {
                const start = this.stage.getCoordByPixels(this.x, this.y);
                const end = this.stage.getCoordByPixels(this.targeter.target.x, this.targeter.target.y);
                PATH_FINDER.findPath(this.stage.dataGrid, start.x, start.y, end.x, end.y, (path) => {this.setPath(path)});
            }
        }
    }

    setPath(path)
    {
        console.log(path);
        if (path)
        {
            this.tweens = PATH_FINDER.getTweens(this, path, this.stage.data.tileWidth, this.stage.data.tileHeight);
            this.tweens[0].onComplete = () => {this.tweenCallback()};
            this.scene.tweens.add(this.tweens[0]);
            this.tweening = true;
        }
    }

    tweenCallback()
    {
        this.tweening = false;
    }

    enemyCollision(other)
    {
    }

    postCollision()
    {
        //this.die();
    }

    findPlayer()
    {
        for (let a of this.stage.spawn.allActors)
        {
            if (a.ACTOR_TYPE == "player")
            {
                this.targeter.setTarget(a);
            }
        }
    }
}