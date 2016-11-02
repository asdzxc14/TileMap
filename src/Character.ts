class Character {
    public PersonBitmap: egret.Bitmap;
    private IsIdle: boolean;
    private IsWalking: boolean;
    private GoRight: boolean = false;
    private GoLeft: boolean = false;
    private IdleOrWalkStateMachine: StateMachine;
    private LeftOrRightStateMachine: StateMachine;

    constructor() {
        this.PersonBitmap = new egret.Bitmap();
        this.PersonBitmap.width = 49;
        this.PersonBitmap.height = 64;
        this.IsIdle = true;
        this.IsWalking = false;
        this.IdleOrWalkStateMachine = new StateMachine();
        this.LeftOrRightStateMachine = new StateMachine();

    }

    public SetPersonBitmap(picture: egret.Bitmap) {
        this.PersonBitmap = picture;
    }


    public SetIdle(set: boolean) {
        this.IsIdle = set;
    }

    public GetIfIdle(): boolean {
        return this.IsIdle;
    }

    public SetWalk(set: boolean) {
        this.IsWalking = set;
    }

    public GetIfWalk(): boolean {
        return this.IsWalking
    }

    public SetGoRight() {
        this.GoRight = true;
        this.GoLeft = false;
    }

    public GetIfGoRight(): boolean {
        return this.GoRight;
    }

    public SetGoLeft() {
        this.GoLeft = true;
        this.GoRight = false;
    }

    public GetIfGoLeft(): boolean {
        return this.GoLeft;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public SetState(e: State, _tmain: Main) {
        this.IdleOrWalkStateMachine.setState(e, _tmain);
    }

    public SetRightOrLeftState(e: State, _tmain: Main) {
        this.LeftOrRightStateMachine.setState(e, _tmain);
    }
}

