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
        this.targeter = new TargetingSystem(this.actor.stage, new Phaser.Geom.Point(this.actor.x, this.actor.y), this.actor.teamTag);
        this.mover = new PointDirectionMover(this.actor);
        
        this.maxHp = this.actor.maxHp;
        
        this.actor.overridden = true;
        
        this.buildings = ['wall', 'turret', 'targetingturret'];
        this.selectedBuilding = 0;

        this.controlKeys = 
        {
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        this.scene.input.on('pointerdown', this.handleClick, this);
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
        this.mover.update();

        this.actor.updatePosition();
    }

    handleClick(pointer)
    {
        const clickX = this.actor.scene.cameras.main.scrollX + pointer.x;
        const clickY = this.actor.scene.cameras.main.scrollY + pointer.y;
        this.targeter.setTarget(new Phaser.Geom.Point(clickX, clickY));
        this.actor.faceDirection = this.targeter.getDirectionToTarget();

        this.mover.moveTo(clickX, clickY);        
    }
}