class TileNode {
    public x:number;
    public y:number;
    public f:number;
    public g:number;
    public h:number;
    public walkable:boolean = true;
    public parent:TileNode;
    public costMultiplier:number = 1.0;

    public constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
}