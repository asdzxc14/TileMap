class AStar {
    private _open: Tile[];
    private _closed: Tile[];
    private tileMap: GameMap;
    public startTile: Tile;
    public endTile: Tile;
    public pathArray: Tile[];
    private straightCost: number = 1.0;
    private diagCost: number = Math.SQRT2;
    private heuristic: Function = this.diagonal;
    constructor() { };

    public findPath(tileMap: GameMap): any {
        var h = 0;
        var g = 0;
        this.pathArray = [];
        this.tileMap = tileMap;
        this._open = [];
        this._closed = [];
        this.startTile = tileMap.startTile;
        this.endTile = tileMap.endTile;
        this.startTile.tileData.g = 0;
        this.startTile.tileData.h = this.heuristic(this.startTile);
        this.startTile.tileData.f = this.startTile.tileData.g + this.startTile.tileData.h;
        return this.search();
    }

    private isOpen(tile: Tile): any {
        for (var i = 0; i < this._open.length; i++) {
            if (tile == this._open[i]) {
                return true;
            }
        }
        return false;
    }

    private isClosed(tile: Tile): any {
        for (var i = 0; i < this._closed.length; i++) {
            if (tile == this._closed[i]) {
                return true;
            }
        }
        return false;
    }

    private findMinFInOpenArray(): any {
        var i = 0;
        var temp: Tile;
        for (var j = 0; j < this._open.length; j++) {
            if (this._open[i].tileData.f > this._open[j].tileData.f) {
                i = j;
            }
        }
        temp = this._open[i];
        for (j = i; j < this._open.length - 1; j++) {
            this._open[j] = this._open[j + 1];
        }
        this._open.pop();
        return temp;
    }

    public search(): any {
        var tile = this.startTile;

        while (tile != this.endTile) {
            var startX: number = Math.max(0, tile.tileData.x - 1);
            var endX: number = Math.min(this.tileMap.numCols - 1, tile.tileData.x + 1);
            var startY: number = Math.max(0, tile.tileData.y - 1);
            var endY: number = Math.min(this.tileMap.numRows - 1, tile.tileData.y + 1);
            for (var i: number = startX; i <= endX; i++) {
                for (var j: number = startY; j <= endY; j++) {
                    var test: Tile = this.tileMap.getTile(i, j);
                    if (test == tile || !test.tileData.walkable || !this.tileMap.getTile(tile.tileData.x, test.tileData.y).tileData.walkable || !this.tileMap.getTile(test.tileData.x, tile.tileData.y).tileData.walkable) {
                        continue;
                    }
                    var cost: number = this.straightCost;
                    if (!((tile.tileData.x == test.tileData.x) || (tile.tileData.y == test.tileData.y))) {
                        cost = this.diagCost;
                    }
                    var g: number = tile.tileData.g + cost * test.tileData.costMultiplier;
                    var h: number = this.heuristic(test);
                    var f: number = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.tileData.f > f) {
                            test.tileData.f = f;
                            test.tileData.g = g;
                            test.tileData.h = h;
                            test.tileParent = tile;
                        }
                    }
                    else {
                        test.tileData.f = f;
                        test.tileData.g = g;
                        test.tileData.h = h;
                        test.tileParent = tile;
                        this._open.push(test);
                    }

                }
            }
            this._closed.push(tile);
            if (this._open.length == 0) {
                console.log("no path found");
                return false
            }
            tile = this.findMinFInOpenArray();
        }
        this.buildPath();
        return true;

    }

    private buildPath(): void {

        var tile: Tile = this.endTile;
        this.pathArray.push(tile);
        while (tile != this.startTile) {
            tile = tile.tileParent;
            this.pathArray.unshift(tile);
        }
    }


    private emanhattan(tile: Tile): number {
        return Math.abs(tile.x - this.endTile.tileData.x) * this.straightCost +
            Math.abs(tile.y + this.endTile.tileData.y) * this.straightCost;
    }

    private euclidian(tile: Tile): number {
        var dx: number = tile.x - this.endTile.tileData.x;
        var dy: number = tile.y - this.endTile.tileData.y;
        return Math.sqrt(dx * dx + dy * dy) * this.straightCost;
    }

    private diagonal(tile: Tile): number {
        var dx: number = Math.abs(tile.tileData.x - this.endTile.tileData.x);
        var dy: number = Math.abs(tile.tileData.y - this.endTile.tileData.y);
        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;
        return this.diagCost * diag + this.straightCost * (straight - 2 * diag);
    }

}
