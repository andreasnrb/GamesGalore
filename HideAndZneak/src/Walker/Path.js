function Path(directions, index, reverse) {
   var that = {};
    that.directions = directions;
    that.index = index || 0;
    that.order = reverse ? -1 : 1;
    that.x = 0;
    that.y = 0;
    that.steps = 0;
    that.step = function(step_length) {
        that.x = that.y = 0;
        if (that.steps * step_length > (that.directions[that.index][1] * step_length)) {
            that.steps = 0;
            that.index+=that.order;
            if (that.index >= that.directions.length) {
                that.index = 0;
            }
        }
        if (that.directions[that.index][0]) {
            switch (that.directions[that.index][0]) {
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
        }
        that.steps++;
        return {step:that.steps,x:that.x, y:that.y, anim:that.directions[that.index][0]};
    };
    return that;
}