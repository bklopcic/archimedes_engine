class ChunkEditerScene extends Phaser.Scene
{
    constructor()
    {
        super(
        {
            key: "chunk-editer", 
            physics:
            {
                default: 'arcade',
                arcade: 
                {
                    debug: false
        }}});

        this.stage;
    }

    create()
    {
        const data = {
            chunkWidth: 1000,
            chunkHeight: 800, 
            numChunksX: 1,
            numChunksY: 1,
            tileWidth: 100,
            tileHeight: 80,
            tilesPerChunkX: 10,
            tilesPerChunkY: 10,
            activeRange: {
                startIdx: {
                    x: 0,
                    y: 0
                },
                endIdx: {
                    x: 1,
                    y: 1
                }
            },
            tileSet: ["tile0", "tile1"],
            chunks: [
                [{
                    actors: [],
                    tiles: [
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
                    ]
                }]
            ]
        };

        this.stage = new Stage(this, data);
        const debugContainer = this.add.container(0,0);
        this.stage.chunker.startDebug(debugContainer);

        this.input.on('pointerdown', function (pointer)
        {
            if (this.stage.chunker.checkIdxExists(this.stage.chunker.getParentChunkIdx(pointer)))
            {
                this.stage.spawn.spawnActor("turret", pointer.x, pointer.y);
            }
        }, this);
    }

    update()
    {
        this.stage.update();
    }

}