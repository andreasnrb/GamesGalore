function Level(game) {
    var that = {};
    that.game = game;
    that.preload = function() {
        that.game.load.tilemap('level', 'assets/zombie-tiles.json', null, Phaser.Tilemap.TILED_JSON);
        that.game.load.image('tiles', 'assets/tilea4.png');
    };
    that.create = function() {
        that.game.stage.backgroundColor = '#000000';
        that.map = that.game.add.tilemap('level');
        that.map.addTilesetImage('Ground', 'tiles');
        that.layer = that.map.createLayer('Ground');
        that.layer2 = that.map.createLayer('Blocks');
        that.map.setCollisionByExclusion([0],true,'Blocks');
        that.layer.resizeWorld();
        that.pathing=Pathing(this);
        that.pathing.create();
    };
    that.walkables = [0];
    that.update = function(player) {
        that.game.physics.arcade.collide(player.getSprite(), that.layer2);
    };
    that.getTilemap = function () {
        return that.map;
    };
    that.getCollisionData = function () {
        return that.map.layers[1].data;
    };
    that.getCollisionLayer = function () {
        return that.layer2;
    };
    that.getPathing = function () {
        return that.pathing.findPathTo;
    };
    return that;
}