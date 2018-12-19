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

        this.input.on('pointerdown', this.handleClick, this);
    }

    update()
    {
        this.stage.update();
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
            console.log(gridSnap);
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