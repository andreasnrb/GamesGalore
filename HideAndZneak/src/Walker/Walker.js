/**
 *
 * @param character
 * @param step_length
 * @returns {{}}
 * @constructor
 */
function Walker(character) {
    var that = {};
    var prevX,prevY, tweening;
    /**
     * [direction, distance]
     * @param walkType
     */
    var walkType = function (walkType) {
        that.walkType = walkType;
    };
    var stepData;
    var step = function (speed) {

        //if(!tweening) {
            stepData= that.walkType.step(character, speed);
            /*console.log(stepData);
            var tween = character.game.add.tween(character);
            tween.onStart.add(function () {
                    tweening = true;
                });
            tween.onComplete.add(function () {
                    tweening = false
                });
            tween.to({ x: stepData.cordX, y: stepData.cordY }, 500);
            tween.start();
        }*/
        if (stepData.cordX != prevX)
            prevX = character.x = stepData.cordX;
        else if (stepData.x)
            character.body.velocity.x = stepData.x;

        if (stepData.cordY != prevY)
            prevY=character.y = stepData.cordY;
        else if (stepData.y)
            character.body.velocity.y = stepData.y;

        if (stepData.z =='top')
            character.bringToTop();
        //if (stepData.x || stepData.y)*/
            character.animations.play(stepData.anim);/*
        //else
        //    character.animations.stop();*/
        return that.steps;
    };/*
    that.getCords = function() {
        return this.walkType.getCords();
    };
    that.getDist = function() {
        return this.walkType.getDist();
    };*/
    return {step:step,walkType:walkType};
}