var Character = (function () {
    function Character() {
        this.goRight = false;
        this.goLeft = false;
        this.characterBitmap = new egret.Bitmap();
        this.characterBitmap.width = 49;
        this.characterBitmap.height = 64;
        this.ifIdle = true;
        this.ifWalking = false;
        this.idleOrWalkStateMachine = new StateMachine();
        this.leftOrRightStateMachine = new StateMachine();
    }
    var d = __define,c=Character,p=c.prototype;
    p.SetCharacterBitmap = function (picture) {
        this.characterBitmap = picture;
    };
    p.SetGoRight = function () {
        this.goRight = true;
        this.goLeft = false;
    };
    p.GetIfGoRight = function () {
        return this.goRight;
    };
    p.SetGoLeft = function () {
        this.goLeft = true;
        this.goRight = false;
    };
    p.GetIfGoLeft = function () {
        return this.goLeft;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.SetState = function (e, _tmain) {
        this.idleOrWalkStateMachine.setState(e, _tmain);
    };
    p.SetRightOrLeftState = function (e, _tmain) {
        this.leftOrRightStateMachine.setState(e, _tmain);
    };
    return Character;
}());
egret.registerClass(Character,'Character');
//# sourceMappingURL=Character.js.map