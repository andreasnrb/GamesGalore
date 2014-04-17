function CordPath(cords, index, reverse) {
    var that = {};
    that.cords = cords;
    that.index = index || 0;
    that.order = reverse ? -1 : 1;
    that.x = 0;
    that.y = 0;
    that.moveX = 0;
    that.moveY = 0;
    that.y = 0;

    that.prevX = 0;
    that.prevY = 0;

    that.steps = 0;
    that.direction = 'right';
    that.setCords = function(newCords) {
        that.cords = newCords;
    };
    that.next = function(character) {
        var x, y, dist;
        if (that.index>=0) {
            x = that.cords[that.index][0];
            y = that.cords[that.index][1];
            dist = character.game.physics.arcade.distanceToXY(character, x, y);
            if (dist >= 0 && dist <= 3) {
                that.prevX = Math.floor(x);
                that.prevY = Math.floor(y);
                that.index++;
                if (that.index >= that.cords.length) {
                    that.index = -1;
                }
                console.log('next ' + that.index);
            }
        }
    };
    that.step = function(step_length) {
        that.x = that.y = 0;
        if (that.index>=0 && that.index < that.cords.length) {
            that.moveX = Math.floor(that.cords[that.index][0]);
            that.moveY = Math.floor(that.cords[that.index][1]);
//            console.log(that.moveX + " " + that.moveY);
            if (that.prevX < that.moveX)
                that.direction = 'right';
            else if (that.prevX > that.moveX)
                that.direction = 'left';
            else if (that.prevY > that.moveY)
                that.direction = 'up';
            else if (that.prevY < that.moveY)
                that.direction = 'down';
            else {
                that.direction = '';
            }
            console.log(that.direction);
            switch (that.direction) {
                case 'left':
                    that.x = -step_length;
                    break;
                case 'right':
                    that.x = step_length;
                    break;
                case 'up':
                    that.y = -step_length;
                    break;
                case 'down':
                    that.y = step_length;
                    break;
                default:
                    that.x = 0;
                    that.y = 0;
                    break;
            }
            that.steps++;
        }
        return {step:that.steps,x:that.x, y:that.y, anim:that.direction};
    };
    return that;
}