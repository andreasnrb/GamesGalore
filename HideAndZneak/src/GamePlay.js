Game.Play = function (game) {
    var player, assets= [], level, enemy=[], that = {
        preload: function() {
            level = Level(game);
            player = Player(game);

            enemy[0] = Enemy2(game, level, player);
            level.preload();
            assets.push(player);
            assets.push(enemy);
            assets.forEach(asset_preload);
            game.onPause.add(function(event){
                that.pause=true;
            });
            game.onFocus.add(function(event){
                that.pause=false;
            });
        },

        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            level.create();
            assets.forEach(asset_create);
        },
        update: function() {
            if(that.pause)
                return;
            level.update(player);
            assets.forEach(asset_update);
        }
    };
    return that;
};