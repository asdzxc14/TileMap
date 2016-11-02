class TileNode {
    public x: number;
    public y: number;
    public walkable: boolean;
    public pictureName: string;
    public f: number;
    public g: number;
    public h: number;
    public costMultiplier: number = 1.0;

	constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}