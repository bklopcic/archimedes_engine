const phaserConfig = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    scene: [ChunkTestScene],
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(phaserConfig);