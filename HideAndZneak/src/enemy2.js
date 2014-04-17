/**
 *
 * @param  game Game
 * @returns {{}}
 * @constructor
 * @param level
 * @param hunted
 */
function Enemy2(game, level, hunted) {
    var that = {};
    that.preload = function() {
        game.load.spritesheet('zombie1', 'assets/Zombie1.png', 32, 32);
    };

    that.create = function() {
        that.sprite = game.add.sprite(32, 32, 'zombie1');
        that.sprite.anchor.setTo(0.5, 0.5);
        that.sprite.name = 'Zombie';
        that.walker = Walker(that.sprite);
        game.physics.arcade.enable(that.sprite);
        that.sprite.body.collideWorldBounds = true;

        that.sprite.animations.add('down', [0, 1, 2,1], 5, true);
        that.sprite.animations.add('left', [3, 4, 5,4], 5, true);
        that.sprite.animations.add('right', [6, 7, 8,7], 5, true);
        that.sprite.animations.add('up', [9, 10, 11, 10], 5, true);
        that.sprite.animations.frame = 6;
        that.walker.walkType(Hunter(level.getPathing(), hunted))
    };

    that.update = function() {
        that.walker.step(this);
    };

    that.getSprite = function() {
        return that.sprite;
    };

    return that;
}