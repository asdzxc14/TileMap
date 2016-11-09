var CharacterState = (function () {
    function CharacterState() {
    }
    var d = __define,c=CharacterState,p=c.prototype;
    p.onEnter = function (_tmain) { };
    ;
    p.onExit = function (_tmain) { };
    ;
    return CharacterState;
}());
egret.registerClass(CharacterState,'CharacterState',["State"]);
var StateMachine = (function () {
    function StateMachine() {
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.setState = function (e, _tmain) {
        if (this.CurrentState != null) {
            this.CurrentState.onExit(_tmain);
        }
        this.CurrentState = e;
        this.CurrentState.onEnter(_tmain);
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
var CharacterIdleState = (function () {
    function CharacterIdleState() {
    }
    var d = __define,c=CharacterIdleState,p=c.prototype;
    p.onEnter = function (_tmain) {
        _tmain.character.ifIdle = true;
    };
    ;
    p.onExit = function (_tmain) {
        _tmain.character.ifIdle = false;
    };
    ;
    return CharacterIdleState;
}());
egret.registerClass(CharacterIdleState,'CharacterIdleState');
var CharacterWalkingState = (function () {
    function CharacterWalkingState() {
    }
    var d = __define,c=CharacterWalkingState,p=c.prototype;
    p.onEnter = function (_tmain) {
        _tmain.character.ifWalking = true;
    };
    ;
    p.onExit = function (_tmain) {
        _tmain.character.ifWalking = false;
    };
    ;
    return CharacterWalkingState;
}());
egret.registerClass(CharacterWalkingState,'CharacterWalkingState');
var CharacterGoRightState = (function () {
    function CharacterGoRightState() {
    }
    var d = __define,c=CharacterGoRightState,p=c.prototype;
    p.onEnter = function (_tmain) {
        _tmain.character.SetGoRight();
    };
    ;
    p.onExit = function (_tmain) { };
    ;
    return CharacterGoRightState;
}());
egret.registerClass(CharacterGoRightState,'CharacterGoRightState');
var CharacterGoLeftState = (function () {
    function CharacterGoLeftState() {
    }
    var d = __define,c=CharacterGoLeftState,p=c.prototype;
    p.onEnter = function (_tmain) {
        _tmain.character.SetGoLeft();
    };
    ;
    p.onExit = function (_tmain) { };
    ;
    return CharacterGoLeftState;
}());
egret.registerClass(CharacterGoLeftState,'CharacterGoLeftState');
//# sourceMappingURL=StateMachine.js.map