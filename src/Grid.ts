class Grid {
    public _startNode:TileNode;
    public _endNode:TileNode;
    public _nodes;
    public _numCols:number;
    public _numRows:number;

    public constructor(numCols:number,numRows:number) {

        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();

        for(var i = 0; i<this._numCols; i++) {

            this._nodes[i] =  new Array();
            for(var j=0; j<this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i,j);
            }
        }
    }

    public getNode(x:number,y:number):TileNode {

        return this._nodes[x][y] as TileNode;
    }

    public setEndNode(x:number,y:number):void {

        this._endNode = this._nodes[x][y] as TileNode; 
    }

    public getEndNode():TileNode {

        return this._endNode;
    }

    public setStartNode(x:number,y:number):void {

        this._startNode = this._nodes[x][y] as TileNode;
    }

    public getStartNode():TileNode {

        return this._startNode;
    }

    public setWalkable(x:number,y:number,value:boolean) {

        this._nodes[x][y].walkable = value;
    }

    public getNumCols():number {

        return this._numCols;
    }

    public getNumRows():number {

        return this._numRows;
    }

}