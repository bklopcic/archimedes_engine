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
        
    }
    
    update()
    {
        this.stage.update();
    }
}