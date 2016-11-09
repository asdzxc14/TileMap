class Character {
    public characterBitmap: egret.Bitmap;
    public ifIdle: boolean;
    public ifWalking: boolean;
    private goRight: boolean = false;
    private goLeft: boolean = false;
    private idleOrWalkStateMachine: StateMachine;
    private leftOrRightStateMachine: StateMachine;

    constructor() {
        this.characterBitmap = new egret.Bitmap();
        this.characterBitmap.width = 49;
        this.characterBitmap.height = 64;
        this.ifIdle = true;
        this.ifWalking = false;
        this.idleOrWalkStateMachine = new StateMachine();
        this.leftOrRightStateMachine = new StateMachine();
    }

    public SetCharacterBitmap(picture: egret.Bitmap) {
        this.characterBitmap = picture;
    }

    public SetGoRight() {
        this.goRight = true;
        this.goLeft = false;
    }

    public GetIfGoRight(): boolean {
        return this.goRight;
    }

    public SetGoLeft() {
        this.goLeft = true;
        this.goRight = false;
    }

    public GetIfGoLeft(): boolean {
        return this.goLeft;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public SetState(e: State, _tmain: Main) {
        this.idleOrWalkStateMachine.setState(e, _tmain);
    }

    public SetRightOrLeftState(e: State, _tmain: Main) {
        this.leftOrRightStateMachine.setState(e, _tmain);
    }
}

