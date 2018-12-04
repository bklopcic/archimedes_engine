/**
    This class overrides a Spider actor's internal update logic and connects it instead to user input
    
    @param actor Actor to be controlled by this controller
*/
class PlayerController 
{
    constructor(actor) 
    {
        this.actor = actor;
        this.scene = this.actor.scene;
        
        this.maxHp = this.actor.maxHp;
        this.hp = this.actor.hp;
        
        this.actor.overridden = true;
        
        this.buildings = ['wall', 'turret', 'targetingturret'];
        this.selectedBuilding = 0;

        this.controlKeys = 
        {
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            UP: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            DOWN: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            LEFT: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            RIGHT: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            SPACEBAR: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            E: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        };
    }

    /**
        Handles gathering user input and calling the appropriate methods within the spider
    */
    update() 
    {
        if (!this.actor || !this.actor.active)
        {
            return;
        }
        
        this.hp = this.actor.hp; //update our hp property to match the spider's
        
        let moving = this.checkMoveInput();
        
        //apply movement
        if(moving)
        {
            let moveDirection = Direction.modifyer[this.actor.faceDirection];
            this.actor.body.setVelocity(this.actor.speed * moveDirection.x, this.actor.speed * moveDirection.y);
            this.actor.updatePosition();
        } 
        else 
        {
            this.actor.body.setVelocity(0, 0);
        }
        
        //check for building select toggle
        if(this.controlKeys.SPACEBAR.duration >= 10)
        {
            this.controlKeys.SPACEBAR.reset();
            this.selectedBuilding = (this.selectedBuilding + 1) % this.buildings.length;
        }
        
        //check for build input
        if (this.controlKeys.E.duration >= 10) 
        {
            this.controlKeys.E.reset();
            //this.actor.build(this.buildings[this.selectedBuilding]);
            console.log(this.actor.stage.grid.dataGrid);
        }
    }

    checkMoveInput()
    {        
        //check for movement input
        if (this.controlKeys.W.isDown || this.controlKeys.UP.isDown)
        {
            this.actor.faceDirection = Direction.NORTH;
            return true;
        }
        else if(this.controlKeys.S.isDown || this.controlKeys.DOWN.isDown) 
        {
            this.actor.faceDirection = Direction.SOUTH;
            return true;
        }
        else if (this.controlKeys.A.isDown || this.controlKeys.LEFT.isDown)
        {
            this.actor.faceDirection = Direction.WEST;
            return true;
        }
        else if (this.controlKeys.D.isDown || this.controlKeys.RIGHT.isDown)
        {
            this.actor.faceDirection = Direction.EAST;
            return true;
        }
        return false;
    }
}