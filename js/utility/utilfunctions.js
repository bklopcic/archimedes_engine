var UtilFunctions = 
{
    genRandInt: function(min, max)
    {
        return Math.floor(Math.random() * (max - min) + min);
    },

    checkCoordInRange(startCoord, endCoord, coordToCheck)
    {
        return (coordToCheck.x >= startCoord.x && coordToCheck.x < endCoord.x &&
            coordToCheck.y >= startCoord.y && coordToCheck.y < endCoord.y);
    }
}