class BootScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "boot"});

        this.nextSceneKey;
    }

    init(nextSceneKey)
    {
        this.nextSceneKey = nextSceneKey;
    }

    preload()
    {
        this.load.image('tile0', "assets/img/greentile1.png");
        this.load.image('tile1', "assets/img/greentile2.png");
        this.load.image('tilesheet', "assets/img/green_tilesheet.png");
        this.load.image('targetBox', 'assets/img/targetbox.png');
        this.load.spritesheet('spider', 'assets/img/spider.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('wall', 'assets/img/wall.png');
        this.load.image('turret', 'assets/img/turret.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image("blank", 'assets/img/empty.png');
        this.load.image('fire', 'assets/img/fire.png');
        this.load.image("ball", "assets/img/greenball.png");
        this.load.image("rockpile", "assets/img/rockpile.png");
        this.load.image("stoneresource", "assets/img/stone_drop.png");
        this.load.spritesheet('crossbow', 'assets/img/crossbow_spritesheet.png', {frameWidth: 92, frameHeight: 90, frameCount:64});
        this.load.json('data', 'data/test.json');
    }

    create()
    {
        this.scene.start(this.nextSceneKey);
    }
}