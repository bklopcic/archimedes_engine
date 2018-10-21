class TestScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: "test",
            // map: {
            //     game: "game",
            //     cache: "cache"
            // }
        });

        this.player;
        this.stage;
        this.display;
    }

    preload()
    {
        this.load.image('tile', "assets/img/testTile.png");
        this.load.image('targetBox', 'assets/img/targetbox.png');
        this.load.spritesheet('spider', 'assets/img/spider.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('wall', 'assets/img/wall.png');
        this.load.image('turret', 'assets/img/turret.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('x', 'assets/img/x.png');
        this.load.image('fire', 'assets/img/fire.png');
        this.load.spritesheet('crossbow', 'assets/img/crossbow_spritesheet.png', {frameWidth: 92, frameHeight: 90, frameCount:64});
        this.load.json('data', 'data/test.json');
    
    }
    
    create()
    {
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.physics.p2.setImpactEvents(true);
        
        var width = 17;
        var height = 13;
        
        var data = this.cache.json.get('data');
        
        this.stage = new Stage(this, width, height);
        //this.stage = new Stage(this, 0, 0, 0, 0, data);
        console.log(this.stage.dataGrid);
        
        this.player = new SpiderController(this.stage.spawn.spider(100, 100, Direction.NORTH));
        //this.player = new SpiderController(this.stage.getActorByType('spider'));
        
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
        //this.player.update();
        //this.display.update();
    }
}