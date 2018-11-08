class ChunkTestScene extends Phaser.Scene
{
    constructor()
    {
        super(
        {
            key: "test", 
            physics:
            {
                default: 'arcade',
                arcade: 
                {
                    debug: false
        }}});

        this.player;
        this.stage;
        this.display;
    }

    preload()
    {
        this.load.image('tile', "assets/img/testTile.png");
        this.load.image('box', "assets/img/frame.png");
        this.load.image('dot', "assets/img/dot.png");
        this.load.json('data', 'data/test.json');
    }
    
    create()
    {
        
        var width = 17;
        var height = 13;
        
        var data = this.cache.json.get('data');
        
        this.stage = new Stage(this, width, height);
        //this.stage = new Stage(this, 0, 0, 0, 0, data);
        console.log(this.stage.dataGrid);
        
        const player = this.stage.spawn.player(700, 200, Direction.SOUTH, "player");
        this.stage.spawn.turret(100, 100, Direction.EAST, "enemy");
        this.stage.spawn.targetingTurret(400, 300, Direction.EAST, "enemy");
        this.stage.spawn.resource(600, 500, Direction.WEST, "neutral");
        this.stage.spawn.resource(650, 100, Direction.WEST, "neutral");
        this.stage.spawn.resource(650, 250, Direction.WEST, "neutral");
        this.stage.spawn.resource(650, 350, Direction.WEST, "neutral");
        this.stage.spawn.resource(650, 500, Direction.WEST, "neutral");
        this.player = new PlayerController(player);
        
        //this.display = new HUD(this.player);
        
//        for (var i = 0; i < 4; i++){
//            stage.addActor(new StageCoord(genRandInt(0, width), genRandInt(0, height)), 'targetingturret', "enemy", Direction.EAST);
//        }
//        
//        for (var i = 0; i < 10; i++){
//            stage.addActor(new StageCoord(genRandInt(0, width), genRandInt(0, height)), 'wall', "terrain");
//        }
        
        console.log(this.stage.toString());
    }
    
    update()
    {
        this.stage.update();
        this.player.update();
        //this.display.update();
    }
}