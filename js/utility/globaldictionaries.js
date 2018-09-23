//Direction enum
var Direction = {
    NONE: 0,
    NORTH: 1,
    SOUTH: 2,
    WEST: 3,
    EAST: 4,
    NORTHWEST: 5,
    NORTHEAST: 6,
    SOUTHWEST: 7,
    SOUTHEAST: 8,
    
    
    /***
    This can be very useful. use case ex.: Direction.modifyer[Direction.NORTH].y (yields -1).
    This could be used for something like:
    sprite.body.velocity.y = speed * Direction.modifyer[Direction.NORTH].y;
    sprite.body.velocity.x = speed * Direction.modifyer[Direction.NORTH].x; 
    
    results in movement in a northward direction! huzzah!
    This is even more useful once we realize that an Actor's faceDirection changes all the time,
    but rather than require a bunch of logic to figure out how they should move we can just plug their
    faceDirection into Direction.modifyer and let this mapping do the work. No logic required.
    ***/
    modifyer: {
        0: {x: 0, y: 0},
        1: {x: 0, y:-1},
        2: {x: 0, y: 1},
        3: {x: -1, y: 0},
        4: {x: 1, y: 0},
        5: {x: -1, y: -1},
        6: {x: 1, y: -1},
        7: {x: -1, y: 1},
        8: {x: 1, y: 1}
    },
    
    
    
    //the reverse mapping
    modifyerToDirection : function(modifyer){
        //there are better ways to do this... in the future
        //NOTE: if the syntax for this changes, TargetingSystem.getDirectionToTarget will need to be updated
        
        if (modifyer.x == 0 && modifyer.y == 0){
            return 0;
        } else if (modifyer.x == 0 && modifyer.y == -1){
            return 1;
        } else if (modifyer.x == 0 && modifyer.y == 1){
            return 2;
        } else if (modifyer.x == -1 && modifyer.y == 0){
            return 3;
        } else if (modifyer.x == 1 && modifyer.y == 0){
            return 4;
        } else if (modifyer.x == -1 && modifyer.y == -1){
            return 5;
        } else if (modifyer.x == 1 && modifyer.y == -1){
            return 6;
        } else if (modifyer.x == -1 && modifyer.y == 1){
            return 7;
        } else if (modifyer.x == 1 && modifyer.y == 1){
            return 8;
        } 
    }
}