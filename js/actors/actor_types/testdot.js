class TestDot extends Actor 
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "dot");

        this.ACTOR_TYPE = "testdot";
        this.body.immovable = true;
    }
}