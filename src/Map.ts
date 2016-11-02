var config: TileData[] = [
    { x: 0, y: 0, walkable: true, image: "ground_jpg" },
    { x: 0, y: 1, walkable: true, image: "ground_jpg" },
    { x: 0, y: 2, walkable: true, image: "ground_jpg" },
    { x: 0, y: 3, walkable: true, image: "ground_jpg" },
    { x: 0, y: 4, walkable: true, image: "ground_jpg" },
    { x: 0, y: 5, walkable: true, image: "ground_jpg" },
    { x: 0, y: 6, walkable: true, image: "ground_jpg" },
    { x: 0, y: 7, walkable: true, image: "ground_jpg" },
    { x: 0, y: 8, walkable: true, image: "ground_jpg" },
    { x: 0, y: 9, walkable: true, image: "ground_jpg" },

    { x: 1, y: 0, walkable: true, image: "ground_jpg" },
    { x: 1, y: 1, walkable: true, image: "ground_jpg" },
    { x: 1, y: 2, walkable: true, image: "ground_jpg" },
    { x: 1, y: 3, walkable: true, image: "ground_jpg" },
    { x: 1, y: 4, walkable: true, image: "ground_jpg" },
    { x: 1, y: 5, walkable: true, image: "ground_jpg" },
    { x: 1, y: 6, walkable: true, image: "ground_jpg" },
    { x: 1, y: 7, walkable: true, image: "ground_jpg" },
    { x: 1, y: 8, walkable: true, image: "ground_jpg" },
    { x: 1, y: 9, walkable: true, image: "ground_jpg" },

    { x: 2, y: 0, walkable: true, image: "ground_jpg" },
    { x: 2, y: 1, walkable: true, image: "ground_jpg" },
    { x: 2, y: 2, walkable: false, image: "obstacle_jpg" },
    { x: 2, y: 3, walkable: false, image: "obstacle_jpg" },
    { x: 2, y: 4, walkable: false, image: "obstacle_jpg" },
    { x: 2, y: 5, walkable: false, image: "obstacle_jpg" },
    { x: 2, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 2, y: 7, walkable: true, image: "ground_jpg" },
    { x: 2, y: 8, walkable: true, image: "ground_jpg" },
    { x: 2, y: 9, walkable: true, image: "ground_jpg" },

    { x: 3, y: 0, walkable: true, image: "ground_jpg" },
    { x: 3, y: 1, walkable: true, image: "ground_jpg" },
    { x: 3, y: 2, walkable: true, image: "ground_jpg" },
    { x: 3, y: 3, walkable: true, image: "ground_jpg" },
    { x: 3, y: 4, walkable: true, image: "ground_jpg" },
    { x: 3, y: 5, walkable: true, image: "ground_jpg" },
    { x: 3, y: 6, walkable: true, image: "ground_jpg" },
    { x: 3, y: 7, walkable: true, image: "ground_jpg" },
    { x: 3, y: 8, walkable: true, image: "ground_jpg" },
    { x: 3, y: 9, walkable: true, image: "ground_jpg" },

    { x: 4, y: 0, walkable: true, image: "ground_jpg" },
    { x: 4, y: 1, walkable: true, image: "ground_jpg" },
    { x: 4, y: 2, walkable: true, image: "ground_jpg" },
    { x: 4, y: 3, walkable: true, image: "ground_jpg" },
    { x: 4, y: 4, walkable: true, image: "ground_jpg" },
    { x: 4, y: 5, walkable: true, image: "ground_jpg" },
    { x: 4, y: 6, walkable: true, image: "ground_jpg" },
    { x: 4, y: 7, walkable: true, image: "ground_jpg" },
    { x: 4, y: 8, walkable: true, image: "ground_jpg" },
    { x: 4, y: 9, walkable: true, image: "ground_jpg" },

    { x: 5, y: 0, walkable: true, image: "ground_jpg" },
    { x: 5, y: 1, walkable: false, image: "obstacle_jpg" },
    { x: 5, y: 2, walkable: true, image: "ground_jpg" },
    { x: 5, y: 3, walkable: true, image: "ground_jpg" },
    { x: 5, y: 4, walkable: true, image: "ground_jpg" },
    { x: 5, y: 5, walkable: true, image: "ground_jpg" },
    { x: 5, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 5, y: 7, walkable: false, image: "obstacle_jpg" },
    { x: 5, y: 8, walkable: true, image: "ground_jpg" },
    { x: 5, y: 9, walkable: true, image: "ground_jpg" },

    { x: 6, y: 0, walkable: true, image: "ground_jpg" },
    { x: 6, y: 1, walkable: false, image: "obstacle_jpg" },
    { x: 6, y: 2, walkable: true, image: "ground_jpg" },
    { x: 6, y: 3, walkable: true, image: "ground_jpg" },
    { x: 6, y: 4, walkable: true, image: "ground_jpg" },
    { x: 6, y: 5, walkable: true, image: "ground_jpg" },
    { x: 6, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 6, y: 7, walkable: true, image: "ground_jpg" },
    { x: 6, y: 8, walkable: true, image: "ground_jpg" },
    { x: 6, y: 9, walkable: true, image: "ground_jpg" },

    { x: 7, y: 0, walkable: true, image: "ground_jpg" },
    { x: 7, y: 1, walkable: false, image: "obstacle_jpg" },
    { x: 7, y: 2, walkable: false, image: "obstacle_jpg" },
    { x: 7, y: 3, walkable: false, image: "obstacle_jpg" },
    { x: 7, y: 4, walkable: false, image: "obstacle_jpg" },
    { x: 7, y: 5, walkable: true, image: "ground_jpg" },
    { x: 7, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 7, y: 7, walkable: true, image: "ground_jpg" },
    { x: 7, y: 8, walkable: true, image: "ground_jpg" },
    { x: 7, y: 9, walkable: true, image: "ground_jpg" },

    { x: 8, y: 0, walkable: true, image: "ground_jpg" },
    { x: 8, y: 1, walkable: true, image: "ground_jpg" },
    { x: 8, y: 2, walkable: true, image: "ground_jpg" },
    { x: 8, y: 3, walkable: true, image: "ground_jpg" },
    { x: 8, y: 4, walkable: true, image: "ground_jpg" },
    { x: 8, y: 5, walkable: true, image: "ground_jpg" },
    { x: 8, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 8, y: 7, walkable: true, image: "ground_jpg" },
    { x: 8, y: 8, walkable: true, image: "ground_jpg" },
    { x: 8, y: 9, walkable: true, image: "ground_jpg" },

    { x: 9, y: 0, walkable: true, image: "ground_jpg" },
    { x: 9, y: 1, walkable: true, image: "ground_jpg" },
    { x: 9, y: 2, walkable: true, image: "ground_jpg" },
    { x: 9, y: 3, walkable: true, image: "ground_jpg" },
    { x: 9, y: 4, walkable: true, image: "ground_jpg" },
    { x: 9, y: 5, walkable: true, image: "ground_jpg" },
    { x: 9, y: 6, walkable: false, image: "obstacle_jpg" },
    { x: 9, y: 7, walkable: true, image: "ground_jpg" },
    { x: 9, y: 8, walkable: true, image: "ground_jpg" },
    { x: 9, y: 9, walkable: true, image: "ground_jpg" },
]
/*

class GameMap extends egret.DisplayObjectContainer {
    public static tilesize = 64;
    public constructor() {
        super();
        this.init();
    }

    private init() {
        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new MapTile(data);
            this.addChild(tile);
        }
    }
}

class MapTile extends egret.DisplayObjectContainer {
    x: number;
    y: number;
    walkable: boolean;
    image: string;

    constructor(data) {
        super();

        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(this.image);

        this.x = data.x * GameMap.tilesize;
        this.y = data.y * GameMap.tilesize;

        this.walkable = data.walkable;
        this.image = data.image;

        this.addChild(bitmap);
    }
}

*/

interface TileData {
    x: number;
    y: number;
    walkable: boolean;
    image: string;
}


//格子类
class Tile extends egret.DisplayObjectContainer {

    data: TileData;

    constructor(data: TileData) {
        super();
        this.data = data;
        var bitmap = new egret.Bitmap;
        var size: number = 50;
        bitmap.texture = RES.getRes(data.image);
        bitmap.x = (data.x - 1) * size;
        bitmap.y = (data.y - 1) * size;
        this.addChild(bitmap);
        //console.log(data.image)
    }

    public clickEvent(): void {
        console.log(this.x);
        console.log(this.y);
    }
}

//地图类
class TileMap extends egret.DisplayObjectContainer {

    public static TILE_SIZE = 32;

    constructor() {
        super();
        this.init();
    }

    private init() {

        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
            //console.log("init success")
        }
        this.touchEnabled = true;

    }

    private grid: Grid = new Grid(10, 10);
    private astar: AStar = new AStar();

    public astarPath(beginX: number, beginY: number, endX: number, endY: number): TileNode[] {

        var path: TileNode[] = new Array();
        this.grid.setStartNode(beginX, beginY);
        this.grid.setEndNode(endX, endY);

        if (this.astar.findPath(this.grid)) {
            path = this.astar.getPath();
        }

        return path;

    }

}