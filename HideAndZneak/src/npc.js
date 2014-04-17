/**
 *
 * @param  game Game
 * @returns {{}}
 * @constructor
 * @param follow
 * @param dist
 */
function NPC(game, follow, dist) {
    var that = {};
    dist = dist || 64;
    that.preload = function() {
        game.load.spritesheet('npc', 'assets/Hero.png', 32, 48);
    };

    that.create = function() {
        that.sprite = game.add.sprite(follow.getSprite().x-dist, follow.getSprite().y, 'npc');
        that.sprite.anchor.setTo(0.5, 0.5);
        that.sprite.name = 'NPC';
        that.walker = Walker(that.sprite, 50);
        game.physics.arcade.enable(that.sprite);
        that.sprite.body.collideWorldBounds = true;

        that.sprite.animations.add('down', [0, 1, 2,1], 10, true);
        that.sprite.animations.add('left', [3, 4, 5,4], 10, true);
        that.sprite.animations.add('right', [6, 7, 8,7], 10, true);
        that.sprite.animations.add('up', [9, 10, 11, 10], 10, true);
        that.sprite.animations.frame = follow.getSprite().animations.frame;
        that.walker.walkType(Follower(that.sprite,follow, dist));
    };

    that.update = function() {
        that.walker.step();
    };

    that.getSprite = function() {
        return that.sprite;
    };

    that.render = function () {
        game.debug.text('follower x: ' + Math.round(that.sprite.x) + ' y:'+Math.round(that.sprite.y), 32, 64);
        game.debug.text('goal '+JSON.stringify(that.walker.getCords()), 32, 80);
        game.debug.text('dist: ' + that.walker.getDist(),32,100);
        var dist = game.physics.arcade.distanceToXY(this.sprite, follow.getSprite().x, follow.getSprite().y);
        game.debug.text('dist2char: ' + dist,32,120);
    };

    return that;
}