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
                    debug: true
        }}});

        this.stage;
        this.data;
    }

    init(data)
    {
        if (data && data.hasOwnProperty("chunkWidth"))
        {
            this.data = data;
        }
        else
        {
            this.data = makeDefaultChunkData();
        }
    }

    create()
    {
        this.stage = new Stage(this, this.data);

        for (let a of this.stage.spawn.allActors)
        {
            a.overridden = true;
        }

        this.input.on("pointerdown", this.handleClick, this);

        this.point = new Phaser.Geom.Point(this.data.chunkWidth/2, this.data.chunkHeight/2);

        this.chunkController = new ChunkingController(this.stage.chunker, this.point);
        this.chunkController.startDebug();
        this.chunkController.triggerPaddingX = 800;
        this.chunkController.triggerPaddingY = 600;
        
        this.cameraSpeed = 10;
        this.cameras.main.setBounds(0, 0, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.physics.world.setBounds(this.cameras.main.x, this.cameras.main.y, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.cameras.main.startFollow(this.point, true);

        this.controlKeys = 
        {
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        };
    }

    update()
    {
        if(this.controlKeys.A.isDown)
        {
            this.point.x-= this.cameraSpeed;
        }
        else if(this.controlKeys.D.isDown)
        {
            this.point.x+= this.cameraSpeed;
        }
        if(this.controlKeys.W.isDown)
        {
            this.point.y-= this.cameraSpeed;
        }
        else if (this.controlKeys.S.isDown)
        {
            this.point.y+= this.cameraSpeed;
        }
        this.chunkController.update();
    }

    getDOMSettings()
    {
        const settings = {};
        settings.type = $("#type-select").val();
        settings.direction = Number($("#direction-select").val());
        settings.team = $("#team-select").val();
        return settings;
    }

    handleClick(pointer)
    {
        if (this.stage.chunker.checkIdxExists(this.stage.chunker.getParentChunkIdx(pointer)))
        {
            const mode = $("#mode-select").val();
            const gridSnap = $("#snap-to-grid-check").prop("checked");
            let clickX;
            let clickY;
            
            if (gridSnap)
            {
                const coord = this.stage.getCoordByPixels(pointer.x, pointer.y);
                const tile = this.stage.getTileAt(new StageCoord(coord.x, coord.y));
                clickX = tile.x + this.data.tileWidth/2;
                clickY = tile.y + this.data.tileHeight/2;
            }
            else
            {
                clickX = pointer.x;
                clickY = pointer.y;
            }

            switch(mode)
            {
                case "place":
                    const set = this.getDOMSettings();
                    const actor = this.stage.spawn.spawnActor(set.type, clickX, clickY, set.direction, set.team);
                    actor.overridden = true;
                    break;
                case "erase":
                    this.stage.spawn.spawnActor("eraser", clickX, clickY);
                    break;
                default:
                    break;
            }
            
        }
    }
}