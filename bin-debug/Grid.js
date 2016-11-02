var Grid = (function () {
    function Grid(numCols, numRows) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();
        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = new Array();
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i, j);
            }
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getNode = function (x, y) {
        return this._nodes[x][y];
    };
    p.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    p.getEndNode = function () {
        return this._endNode;
    };
    p.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    p.getStartNode = function () {
        return this._startNode;
    };
    p.setWalkable = function (x, y, value) {
        this._nodes[x][y].walkable = value;
    };
    p.getNumCols = function () {
        return this._numCols;
    };
    p.getNumRows = function () {
        return this._numRows;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map