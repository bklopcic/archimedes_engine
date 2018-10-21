/**
    This class overrides a Spider actor's internal update logic and connects it instead to user input
    
    @param spider Spider to be controlled by this controller
*/
class SpiderController 
{
    constructor(spider) 
    {
        this.spider = spider;
        this.game = this.spider.game;
        
        this.maxHp = this.spider.maxHp;
        this.hp = this.spider.hp;
        
        this.spider.overridden = true;
        
        this.buildings = ['wall', 'turret', 'targetingturret', 'decoy'];
        this.selectedBuilding = 0;
    }

    /**
        Handles gathering user input and calling the appropriate methods within the spider
    */
    update() 
    {
        if (!this.spider.alive)
        {
            return;
        }
        
        this.hp = this.spider.hp; //update our hp property to match the spider's
        
        let moveDirection = Direction.modifyer[Direction.NONE];
        let moving = false;
        
        //check for movement input
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.spider.faceDirection = Direction.NORTH;
            moving = true;
            
        } else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)) 
        {
            this.spider.faceDirection = Direction.SOUTH;
            moving = true;
            
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.spider.faceDirection = Direction.WEST;
            moving = true;
            
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.spider.faceDirection = Direction.EAST;
            moving = true;
        }
        
        
        //apply movement
        if(moving)
        {
            moveDirection = Direction.modifyer[this.spider.faceDirection];
            this.spider.body.velocity.x = this.spider.speed * moveDirection.x;
            this.spider.body.velocity.y = this.spider.speed * moveDirection.y; //find a prettier way to do this?
            this.spider.updatePosition();
        } 
        else 
        {
            this.spider.body.velocity.x = 0;
            this.spider.body.velocity.y = 0;
        }
        
        //check for building select toggle
        if(this.game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 10))
        {
            this.selectedBuilding = (this.selectedBuilding + 1) % this.buildings.length;
        }
        
        //check for build input
        if (this.game.input.keyboard.downDuration(Phaser.Keyboard.E, 10)) 
        {
            this.spider.build(this.buildings[this.selectedBuilding]);
            console.log(this.spider.scene.dataGrid);
        }
    }
}