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
        $("#data-display").val(JSON.stringify(game.scene.getScene("chunk-editer").stage.dataLiteral));
    });

    $("#load-data-btn").click(function(){
        game.scene.start("chunk-editer", JSON.parse($("#data-display").val()));
    });

    $("#clear-data-btn").click(function(){
        $("#data-display").val("");
    });

    $('#copy-data-btn').click(function(){
        copyText('data-display');
    });

    $("#new-stage-form-container").hide();

    $("#create-new-btn").click(function(){
        const defaultData = makeDefaultChunkData();
        const config = {
            numChunksX: defaultData.numChunksX,
            numChunksY: defaultData.numChunksY, 
            chunkWidth: defaultData.chunkWidth, 
            chunkHeight: defaultData.chunkHeight, 
            tilesPerChunkX: defaultData.tilesPerChunkX, 
            tilesPerChunksY: defaultData.tilesPerChunkY, 
            tileWidth: defaultData.tileWidth, 
            tileHeight: defaultData.tileHeight
        };
        //$("#new-stage-config-display").val(JSON.stringify(config).replace(/,/g, ",\n"));
        $("#new-stage-form-container").show();
    });

    $("#submit-new-stage-config").click(function(){
        const data = generateStageData(
            Number($("#num-chunks-x").val()),
            Number($("#num-chunks-y").val()),
            Number($("#chunk-width").val()),
            Number($("#chunk-height").val()),
            Number($("#tiles-per-chunk-x").val()),
            Number($("#tiles-per-chunk-y").val()),
            Number($("#tile-width").val()),
            Number($("#tile-height").val())
        );
        $("#new-stage-form-container").hide();
        game.scene.start("chunk-editer", data);     
    });

});