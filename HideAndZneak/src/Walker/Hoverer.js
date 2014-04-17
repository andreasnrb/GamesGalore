/**
 *
 * @param follow
 * @returns {{x: number, y: number, step: step}}
 * @constructor
 */
function Hoverer(follow) {
    var that ={
        x:0,
        y:0,
        anim:'',
        prevX:0,
        prevY:0,
        prevAnim:'',
        steps:[],
        print:false,
        step: function(){
            var lookingX= 0,lookingY = 0,z='top';
            that.x = follow.getSprite().body.velocity.x;
            that.y = follow.getSprite().body.velocity.y;
            that.anim = follow.getCurrentAnimation();
            if (that.anim == 'left') {
                lookingX = 28;
                lookingY = 12;
            } else if (that.anim == 'right') {
                lookingX = -28;
                lookingY = 12;
            } else if (that.anim == 'up')
                lookingY = 32;
            else if (that.anim == 'down') {
                lookingY = -16;
                follow.getSprite().bringToTop();
                z='';
            }

            return {
                z:z,
                cordX:follow.getSprite().x+lookingX,
                cordY:follow.getSprite().y+lookingY,
                x:that.x,y:that.y, anim:that.anim};
        }
    };
    return that;
}