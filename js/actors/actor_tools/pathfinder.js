const PATH_FINDER = 
{
    easyStar: new EasyStar.js(),

    findPath: function(grid, fromX, fromY, toX, toY, callback)
    {
        this.easyStar.setGrid(grid);

        this.easyStar.findPath(fromX, fromY, toX, toY, callback);
        this.easyStar.calculate();
    },

    tweenActor: function(actor, path, tileWidth, tileHeight)
    {
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                targets: actor,
                x: {value: ex*tileWidth + tileWidth/2, duration: 200},
                y: {value: ey*tileHeight + tileHeight/2, duration: 200}
            });
        }
    
        actor.scene.tweens.timeline({
            tweens: tweens
        });
        return tweens;
    }
};

PATH_FINDER.easyStar.setAcceptableTiles([0]);