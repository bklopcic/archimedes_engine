const phaserConfig = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    scene: [TestScene],
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(phaserConfig);


function genRandInt(min, max){
    return Math.floor((Math.random() * (max - min))+min);
}