$(document).ready(function(){

    for (const type in ACTOR_TYPES) 
    {
        if (ACTOR_TYPES.hasOwnProperty(type) && type != "eraser") 
        {
            const elem = $("<option>");
            elem.attr("value", type);
            elem.html(type);
            $("#type-select").append(elem);
        }
    }

    $("#get-data-btn").click(function(){
        const scene = game.scene.getScene("chunk-editer");
        const data = scene.stage.dataLiteral.chunks[0][0];

        const xOffset = Number($("#chunk-x-index").val());
        const yOffset = Number($("#chunk-y-index").val());

        for (a of data.actors)
        {
            a.x += xOffset * scene.data.chunkWidth;
            a.y += yOffset * scene.data.chunkHeight;
        }

        $("#data-display").val(JSON.stringify(data));
    });

    $("#load-data-btn").click(function(){
        const data = makeDefaultChunkData();
        const input = JSON.parse($("#data-display").val());
        const xOffset = Number($("#chunk-x-index").val());
        const yOffset = Number($("#chunk-y-index").val());
        for (a of input.actors)
        {
            a.x -= xOffset * data.chunkWidth;
            a.y -= yOffset * data.chunkHeight;
        }
        data.chunks[0][0].actors = input.actors;
        data.chunks[0][0].tiles = input.tiles;
        game.scene.start("chunk-editer", data);
    });

});

function makeDefaultChunkData()
{
    return {
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
}