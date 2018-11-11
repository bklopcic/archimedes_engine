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
        
        var data = 
        {
            chunkWidth: 50,
            chunkHeight: 50,
            chunks: [
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]]
            ]
        }
        
        this.stage = new Stage(this, width, height, 0, 0, data);
        this.stage.chunker.startDebug();

        this.stage.chunker.setActiveRange(new StageCoord(0,0), new StageCoord(3,3));
        
    }
    
    update()
    {
        this.stage.update();
    }
}