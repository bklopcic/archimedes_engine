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
            Q: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            E: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            R: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        };

        this.scene.input.on('pointerdown', this.handleClick, this);

        this.faceFrames = {1: 28, 2: 182, 3: 209, 4: 59, 5: 88, 6: 117, 7: 139, 8: 160};
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
        this.targeter.updatePosition(new Phaser.Geom.Point(this.actor.x, this.actor.y));
        this.actor.sprite.setFrame(this.faceFrames[this.actor.faceDirection]);
        

        if(Phaser.Input.Keyboard.JustDown(this.controlKeys.E))
        {
            this.build();
        }
        if(Phaser.Input.Keyboard.JustDown(this.controlKeys.R))
        {
            this.attack();
        }
        if(Phaser.Input.Keyboard.JustDown(this.controlKeys.Q))
        {
            this.selectedBuilding++;
            this.selectedBuilding = this.selectedBuilding % this.buildings.length;
        }
        else if (Phaser.Input.Keyboard.JustDown(this.controlKeys.Q))
        {
            this.selectedBuilding--;
            this.selectedBuilding = (this.selectedBuilding + this.buildings.length) % this.buildings.length;
        }
    }

    handleClick(pointer)
    {
        const clickX = this.actor.scene.cameras.main.scrollX + pointer.x;
        const clickY = this.actor.scene.cameras.main.scrollY + pointer.y;
        if (pointer.leftButtonDown())
        {
            this.moveTo(clickX, clickY);
        }
        else if (pointer.rightButtonDown())
        {
            const stage = this.actor.stage;
            this.targeter.setTarget(new Phaser.Geom.Point(clickX, clickY));
            let coord = stage.getCoordByPixels(clickX, clickY);
            const mod = Direction.modifyer[this.targeter.getDirectionToTarget()];
            console.log(mod);
            mod.x *= -1;
            mod.y *= -1;
            let direction = Direction.modifyerToDirection(mod);
            let target = stage.getTileAt(coord.getNeighbor(direction));
            this.moveTo(target.x + stage.data.tileWidth/2, target.y + stage.data.tileHeight/2);
        }
        
    }

    moveTo(x, y)
    {
        this.targeter.setTarget(new Phaser.Geom.Point(x, y));
        this.actor.faceDirection = this.targeter.getDirectionToTarget();
        this.mover.moveTo(x, y);    
    }

    build()
    {
        const stage = this.actor.stage;
        let targetCoord = this.actor.stagePosition.getNeighbor(this.actor.faceDirection);
        if (stage.checkIfEmpty(targetCoord))
        {
            const targetTile = stage.getTileAt(targetCoord);
            let x = targetTile.x + stage.data.tileWidth/2;
            let y = targetTile.y + stage.data.tileHeight/2;
            stage.spawn.spawnActor(this.buildings[this.selectedBuilding], x, y, this.actor.faceDirection, this.actor.teamTag);
        }
    }

    attack()
    {
        const stage = this.actor.stage;
        let targetCoord = this.actor.stagePosition.getNeighbor(this.actor.faceDirection);
        let targetTile = stage.getTileAt(targetCoord);
        let x = targetTile.x + stage.data.tileWidth/2;
        let y = targetTile.y + stage.data.tileHeight/2;
        const attack = stage.spawn.spawnActor("playerattack", x, y, this.actor.faceDirection, this.actor.teamTag);
        attack.attackDamage = this.actor.attackDamage;
    }
}