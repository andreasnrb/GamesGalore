Game.MainMenu = function (game) {
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Creepster']
        }

    };

    var _isDown,text, play,clickArea, that = {
        preload: function () {
            game.load.image('bg', 'assets/lab.png');

            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },
        create: function () {
            game.stage.setBackgroundColor(0x2d2d2d);
            game.add.sprite(0, 0, 'bg');
        },
        update: function () {
            if (game.input.activePointer.isDown) {
                if (Phaser.Rectangle.contains(clickArea, game.input.x, game.input.y) && !_isDown) {
                    _isDown = true;
                    onClickFunction();
                }
            }
            if (game.input.activePointer.isUp) {
                onReleaseFunction();
                _isDown = false;
            }
        }
    };

    function onClickFunction() {
        var changeState;
        if (play) {
            play.scale.x = play.scale.y = 0.9;
            changeState = function() {
                game.state.start('StartGame');
            };
            game.time.events.add(Phaser.Timer.SECOND+5, changeState, this);
        }
    }

    function onReleaseFunction() {
        if (play)
            play.scale.x = play.scale.y = 1;
    }

    function createText() {
        text = game.add.text(game.world.centerX, game.world.centerY-140, "Hide and Zneak");
        text.anchor.setTo(0.5);
        text.setShadow(-10,10,'rgba(0, 0, 0, 0.5)',10);
        text.angle=-5;
        text.font = 'Creepster';
        text.fontSize = 100;
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.fill = '#FF0000';

        play = game.add.text(game.world.centerX, game.world.centerY+100, "Start Game");
        play.anchor.setTo(0.5);
        play.font = 'Creepster';
        play.fontSize = 60;
        play.align = 'center';
        play.stroke = '#000000';
        play.strokeThickness = 2;
        play.fill = '#FF0000';
        clickArea = new Phaser.Rectangle(play.x - play.width / 2, play.y - play.height / 2, play.width, play.height);

    }
    return that;
};