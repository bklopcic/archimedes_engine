class TestDot extends Actor 
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "dot");

        this.body.immovable = true;
    }
}