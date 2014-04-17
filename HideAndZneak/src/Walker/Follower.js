/**
 *
 * @param follow
 * @returns {{x: number, y: number, step: step}}
 * @constructor
 * @param character
 * @param dist
 */
function Follower(character,follow, dist) {
    var that ={
        x:0,
        y:0,
        anim:'',
        cordX:0,
        cordY:0,
        prevAnim:'',
        steps:[],
        print:false,
        direction:'right',
        cords:false,
        move:false,
        dist:0,
        wait:false,
        targetDist:0,
        leftToWalk: function() {
            return distanceBetweenCoords(character.x,character.y, this.cords[0],this.cords[1])
        },
        next: function() {
            if (this.cords)
                this.dist = that.leftToWalk()+follow.getTotalDistanceWalked(this.cords[0],this.cords[1]);
            else
                this.dist = follow.getTotalDistanceWalked(character.x,character.y);

            if (this.cords !== false) {
                if (that.leftToWalk()<10) {
                    this.cords = false;
                    console.log('reached it');
                }
            }
            that.move =this.dist >= dist;
        },
        step: function(step_length){
            var z = 'top';

            if (that.move) {
                if (follow.getCordLength()) {
                    if (this.cords === false)
                        this.cords = follow.getCord();
                    this.cordX = this.cords[0];
                    this.cordY = this.cords[1];
                    that.x = this.cords[2];
                    that.y = this.cords[3];
                    that.direction = this.cords[4];
                } else if (this.cords === false) {
                    that.x = follow.getSprite().body.velocity.x;
                    that.y = follow.getSprite().body.velocity.y;
                    that.direction = follow.getCurrentAnimation();
                } else {
                    this.cordX = this.cords[0];
                    this.cordY = this.cords[1];
                    that.x = this.cords[2];
                    that.y = this.cords[3];
                    that.direction = this.cords[4];
                }

                if (follow.getSprite().y>character.y) {
                    follow.getSprite().bringToTop();
                    z = '';
                }
            } else {
                that.x = 0;
                that.y = 0;
            }
            return {
                z: z,
                x: that.x, y: that.y, anim: that.direction};
        },
        getCords: function() {
            return this.cords;
        },
        getDist: function() {
            return this.dist;
        }
    };
    return that;
}