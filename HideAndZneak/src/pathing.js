function Pathing(level){
    var that,layer;
    that= {
        pathfinder: null,
        create: function () {
            that.pathfinder = level.getTilemap().game.plugins.add(Phaser.Plugin.PathFinderPlugin);
            that.pathfinder.setGrid(level.getCollisionData(), level.walkables);
        },
        findPathTo: function (fromx, fromy, tox, toy, callback) {
            that.pathfinder.setCallbackFunction(callback);

            that.pathfinder.preparePathCalculation(
                [that.getTileX(fromx), that.getTileY(fromy)],
                [that.getTileX(tox), that.getTileY(toy)]);
            that.pathfinder.calculatePath();
        },
        getTileX: function (x) {
            return level.getCollisionLayer().getTileX(x);
        },
        getTileY: function (y) {
            return level.getCollisionLayer().getTileY(y);
        }
    };
    return that;
}