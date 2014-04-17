function Hunter(pathing, hunted) {
    var that = {
        thePath:[],
        foundPath:false,
        getPath: function(path) {
                path = path || [];
                that.theStep = 0;
                that.thePath = path;
/*                for (var i = 0, ilen = path.length; i < ilen; i++) {
                    pathing.getLevel().getTilemap().putTile(46, path[i].x, path[i].y);
                }*/
        },
        freq:0,
        theStep:0,
        x:0,y:0,
        prevX:0,
        prevY:0,
        prevHX:0,
        prevHY:0,
        paddingx:0,
        step: function(hunter) {
            if (that.freq % 10 == 0) {
                pathing(
                    hunter.x-that.paddingx, hunter.y,
                    hunted.getSprite().x, hunted.getSprite().y,
                    this.getPath);
            }
            if (that.freq % 60 == 0) {
                that.freq = 0;
                if (that.theStep < this.thePath.length - 1)
                    that.theStep++;
            }
            if (that.thePath.length > 0) {
                if (that.thePath[that.theStep].x)
                    that.x = that.thePath[that.theStep].x * 16;
               if (that.thePath[that.theStep].y)
                   that.y = that.thePath[that.theStep].y * 16;
            }

            if (that.x > that.prevX)
                that.anim = 'right';
            else if (that.x < that.prevX)
                that.anim = 'left';
            else if (that.y > that.prevY)
                that.anim = 'down';
            else if (that.y < that.prevY)
                that.anim = 'up';
            that.prevX = that.x;
            that.prevY = that.y;
            that.freq++;
            if (hunter.x<that.x)
                that.paddingx =0;
            else if (hunter.x>that.x)
                that.paddingx = 0;
            return {
                z:'',
                cordX:that.x,
                cordY:that.y,
                x:0,y:0, anim:that.anim};
        }
    };
    return that;
}