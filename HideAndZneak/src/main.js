var Game={};
require.config({
        shim: {
            '../lib/PathFinderPlugin': [
                '../lib/phaser.min',
                '../lib/easystar-0.1.6']
        }
    }
);
require(
    [
        '../lib/phaser.min',
        '../lib/easystar-0.1.6',
        '../lib/PathFinderPlugin',
        'utils',
        'level',
        'player',
        'Walker/Path',
        'Walker/CordPath',
        'Walker/Follower',
        'Walker/Walker',
        'Walker/Hunter',
        'enemy',
        'enemy2',
        'npc',
        'pathing',
        'MainMenu',
        'GamePlay'
    ], function () {
        var game = new Phaser.Game(800, 608, Phaser.AUTO, 'container');
        game.state.add('MainMenu', Game.MainMenu);
        game.state.add('StartGame', Game.Play);
        game.state.start('StartGame');
    }
);