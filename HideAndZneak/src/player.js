/**
 *
 * @param game
 * @returns {Player}
 * @constructor
 */
function Player(game) {
    var that = {};
    that.preload = function() {
        game.load.spritesheet('dude', 'assets/Hero.png', 32, 48);
    };

    that.create = function() {
        // The player and its settings
        this.speed = 200;
        this.sprite = game.add.sprite(256, 256, 'dude');
        game.physics.arcade.enable(that.sprite);
        //  Player physics properties. Give the little guy a slight bounce.
        this.sprite.body.collideWorldBounds = true;
//        that.sprite.anchor.setTo(0.5, 0.5);
        //  Our two animations, walking left and right.
        this.sprite.animations.add('down', [0, 1, 2,1], 10, true);
        this.sprite.animations.add('left', [3, 4, 5,4], 10, true);
        this.sprite.animations.add('right', [6, 7, 8,7], 10, true);
        this.sprite.animations.add('up', [9, 10, 11, 10], 10, true);
        this.sprite.animations.frame = 6;

        //  Our controls.
        this.cursors = game.input.keyboard.createCursorKeys();
    };
    that.freq = 0;
    that.prevAnim = 'right';
    that.state = 'right';
    that.cords = [];
    that.wasX = 0;
    that.wasY = 0;
    that.switched = [];
    that.stateCount = 0;
    that.update = function() {
        this.sprite.bringToTop();
        if (this.sprite.body.velocity.x) {
            that.wasX = this.sprite.body.velocity.x;
            that.wasY = 0;
        }
        if (this.sprite.body.velocity.y) {
            that.wasY = this.sprite.body.velocity.y;
            that.wasX = 0;
        }
        if (this.cursors.left.isDown) {
            this.state = 'left';
            this.sprite.body.velocity.x = -this.speed;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.play(that.state);
        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = this.speed;
            this.sprite.body.velocity.y = 0;
            this.state = 'right';
            this.sprite.animations.play(that.state);
        } else if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -this.speed;
            this.sprite.body.velocity.x = 0;
            this.state = 'up';
            this.sprite.animations.play(this.state);
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = this.speed;
            this.sprite.body.velocity.x = 0;
            this.state = 'down';
            this.sprite.animations.play(that.state);
        } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.stop();
        }
        that.freq++;
/*
        if (that.prevAnim !== this.state) {
            this.cords.unshift([this.sprite.x,this.sprite.y, that.wasX,that.wasY, that.prevAnim]);
            that.prevAnim = this.state;
            that.stateCount++;
            that.message = 'switched ' + that.state + '->' +
            '' + that.prevAnim + ' '+that.stateCount + " dist: "+this.cords.length;
        }
        if (that.freq%60 ===0) {
            that.freq = 0;
            //console.log('x ' + this.sprite.body.x + ' y ' + this.sprite.body.y);
        }*/
    };

    that.render = function() {
        game.debug.text(JSON.stringify(this.cords), 32, 16);
        game.debug.text(that.message, 32, 32);
        game.debug.text(
            'player   x: ' + Math.round(that.sprite.x) +
            ' y:'+Math.round(that.sprite.y)
            , 32, 50);
    };

    that.getSprite = function() {
        return this.sprite;
    };

    that.getCord = function() {
        if (this.cords.length) {
            return this.cords.pop();
        }
        return false;
    };

    that.getCordLength = function() {
        return this.cords.length;
    };

    that.getTotalDistanceWalked = function(x,y, extra) {
        that.dist = 0;
        extra = extra || 0;
        for (var i=1;i<this.cords.length;i++) {
            that.dist += distanceBetweenCoords(this.cords[i-1][0], this.cords[i-1][1],
                    this.cords[i][0], this.cords[i][1]);
        }
        if (this.cords.length == 0) {
            return distanceBetweenCoords(x,y,that.sprite.x,that.sprite.y)+extra;
        } else {
            that.dist+=distanceBetweenCoords(x,y,that.cords[that.cords.length-1][0],that.cords[that.cords.length-1][1]);
            that.dist+=distanceBetweenCoords(that.cords[that.cords.length-1][0],that.cords[that.cords.length-1][1],that.sprite.x,that.sprite.y)
            that.dist=that.dist+extra;
        }
        return that.dist;
    };

    that.getCurrentState = function() {
        return this.state;
    };

    that.getCurrentAnimation = function () {
        var index = this.getSprite().animations.currentFrame.index;
        if (index>=0 && index<=2)
            return 'down';
        if (index>=3 && index<=5)
            return 'left';
        if (index>=6 && index<=8)
            return 'right';
        if (index>=9 && index<=11)
            return 'up';
    };

    return that;
}