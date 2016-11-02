//AStar寻路
var AStar = (function () {
    //private _diagCost: number = Math.SQRT2;
    function AStar() {
        this._heuristic = this.euclidian;
        this._straightCost = 1;
    }
    var d = __define,c=AStar,p=c.prototype;
    p.findPath = function (grid) {
        this._grid = grid;
        this._openList = new Array();
        this._closeList = new Array();
        this._startPoint = this._grid.getStartNode();
        this._endPoint = this._grid.getEndNode();
        this._startPoint.g = 0;
        this._startPoint.h = this._heuristic(this._startPoint);
        this._startPoint.f = this._startPoint.g + this._startPoint.h;
        //console.log("findpath");
        return this.search();
    };
    //主搜寻方法
    p.search = function () {
        var searchpoint = this._startPoint;
        while (searchpoint != this._endPoint) {
            //获取当前点的周围点
            var startX = Math.max(0, searchpoint.x - 1);
            var endX = Math.min(this._grid.getNumCols() - 1, searchpoint.x + 1);
            var startY = Math.max(0, searchpoint.y - 1);
            var endY = Math.min(this._grid.getNumRows() - 1, searchpoint.y + 1);
            //循环处理每个点
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getNode(i, j);
                    //剔除：当前点、不可经过的点、斜线方向的点（即只能直线移动）
                    if (test == searchpoint || !test.walkable || Math.abs(i - searchpoint.x) + Math.abs(j - searchpoint.y) == 2) {
                        continue;
                    }
                    var cost = this._straightCost;
                    /*if (!((searchpoint.x == test.x) || (searchpoint.y == test.y))) {
                        cost = this._diagCost;
                    }*/
                    var g = searchpoint.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = searchpoint;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = searchpoint;
                        this._openList.push(test);
                    }
                }
            }
            this._closeList.push(searchpoint);
            if (this._openList.length == 0) {
                alert("no path found");
                return false;
            }
            this._openList.sort(function (a, b) {
                return a.f - b.f;
            });
            searchpoint = this._openList.shift();
        }
        this.buildPath();
        //console.log("buildpath");
        return true;
    };
    //根据建立的点链表回推路径
    p.buildPath = function () {
        this._path = new Array();
        var point = this._endPoint;
        this._path.push(point);
        while (point != this._startPoint) {
            point = point.parent;
            this._path.unshift(point);
        }
        //console.log(point);
    };
    //获取路径
    p.getPath = function () {
        return this._path;
    };
    //判断是否处于O表内
    p.isOpen = function (point) {
        for (var i = 0; i < this._openList.length; i++) {
            if (this._openList[i] == point) {
                return true;
            }
        }
        return false;
    };
    //判断是否处于C表内
    p.isClosed = function (point) {
        for (var i = 0; i < this._closeList.length; i++) {
            if (this._closeList[i] == point) {
                return true;
            }
        }
        return false;
    };
    //欧几里得启发函数
    p.euclidian = function (point) {
        var result = Math.sqrt(Math.pow(point.x - this._endPoint.x, 2) + Math.pow(point.y - this._endPoint.y, 2));
        return result;
    };
    p.visited = function () {
        return this._closeList.concat(this._openList);
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=Astar.js.map