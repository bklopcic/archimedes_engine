const phaserConfig = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container"
};

const game = new Phaser.Game(phaserConfig);

var stage, player, display;

var testState =
{
    
    preload : function()
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
    
    },
    
    create: function()
    {
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.physics.p2.setImpactEvents(true);
        
        var width = 17;
        var height = 13;
        
        var data = game.cache.json.get('data');
        
        //stage = new Stage(game, width, height);
        stage = new Stage(game, 0, 0, 0, 0, data);
        console.log(stage.dataGrid);
        
        //player = new SpiderController(stage.addActor(new StageCoord(10, 7), 'spider'));
        player = new SpiderController(stage.getActorByType('spider'));
        
        display = new HUD(player);
        
//        for (var i = 0; i < 4; i++){
//            stage.addActor(new StageCoord(genRandInt(0, width), genRandInt(0, height)), 'targetingturret', "enemy", Direction.EAST);
//        }
//        
//        for (var i = 0; i < 10; i++){
//            stage.addActor(new StageCoord(genRandInt(0, width), genRandInt(0, height)), 'wall', "terrain");
//        }
        
        console.log(stage.toString());
    },
    
    update: function()
    {
        stage.update();
        player.update();
        display.update();
    }
}


game.scene.add('testState', testState);
game.scene.start('testState');

function genRandInt(min, max){
    return Math.floor((Math.random() * (max - min))+min);
}