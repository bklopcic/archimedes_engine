class TestScene extends Phaser.Scene
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
        this.load.image('targetBox', 'assets/img/targetbox.png');
        this.load.spritesheet('spider', 'assets/img/spider.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('wall', 'assets/img/wall.png');
        this.load.image('turret', 'assets/img/turret.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('x', 'assets/img/x.png');
        this.load.image('fire', 'assets/img/fire.png');
        this.load.image("ball", "assets/img/greenball.png");
        this.load.image("rockpile", "assets/img/rockpile.png");
        this.load.image("stoneresource", "assets/img/stone_drop.png");
        this.load.spritesheet('crossbow', 'assets/img/crossbow_spritesheet.png', {frameWidth: 92, frameHeight: 90, frameCount:64});
        this.load.json('data', 'data/test.json');
    
    }
    
    create()
    {   
        var data = this.cache.json.get('data');
        
        this.stage = new Stage(this, data);
        this.stage.chunker.startDebug();
        
        const player = this.stage.spawn.player(700, 200, Direction.SOUTH, "player");
        this.player = new PlayerController(player);
        this.chunkController = new ChunkingController(this.stage.chunker, player);
        this.chunkController.triggerPaddingX = 800;
        this.chunkController.triggerPaddingY = 600;
        this.chunkController.startDebug();
        
        this.cameras.main.setBounds(0, 0, 1000 * 7, 800 * 6);
        this.physics.world.setBounds(this.cameras.main.x, this.cameras.main.y, 1000 * 7, 800 * 6);
        this.cameras.main.startFollow(player, true);

        console.log(this.stage.toString());
    }
    
    update()
    {
        this.stage.update();
        this.player.update();
        this.chunkController.update();
    }
}