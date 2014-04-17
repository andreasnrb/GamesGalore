/**
 *
 * @param  game Game
 * @returns {{}}
 * @constructor
 * @param {[]} paths
 * @param {boolean} cords
 */
function Enemy(game, paths, cords) {
    var that = {};
    that.cords = cords || false;
    that.preload = function() {
        game.load.spritesheet('zombie1', 'assets/Zombie1.png', 32, 32);
    };

    that.create = function() {
        /*if (cords) {
            that.sprite = game.add.sprite(paths[0][0], paths[0][1], 'zombie1');
            console.log(JSON.stringify(paths));
        } else*/
            that.sprite = game.add.sprite(256, 256, 'zombie1');
//            that.sprite = game.add.sprite(game.rnd.integerInRange(32,game.world.width), game.rnd.integerInRange(32,game.world.height), 'zombie1');
        that.sprite.anchor.setTo(0.5, 0.5);
        that.sprite.name = 'Zombie';
        that.walker = Walker(that.sprite, 50);
        game.physics.arcade.enable(that.sprite);
        that.sprite.body.collideWorldBounds = true;

        that.sprite.animations.add('down', [0, 1, 2,1], 5, true);
        that.sprite.animations.add('left', [3, 4, 5,4], 5, true);
        that.sprite.animations.add('right', [6, 7, 8,7], 5, true);
        that.sprite.animations.add('up', [9, 10, 11, 10], 5, true);
        that.sprite.animations.frame = 6;
        /*if (that.cords) {
            that.walker.walkType(CordPath(paths, 1));
        } else {
            that.walker.walkType(Path(paths, game.rnd.integerInRange(0, paths.length - 1)));
        }*/
        that.walker.walkType(Hunter(pathing))
    };

    that.update = function() {
//        that.walker.step();
    };

    that.getSprite = function() {
        return that.sprite;
    };

    return that;
}