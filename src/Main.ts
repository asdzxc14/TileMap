//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    public Player: Character = new Character();
    private textfield: egret.TextField;
    private EventPoint: egret.Point = new egret.Point();
    private GoalPoint: egret.Point = new egret.Point();
    private DistancePoint: egret.Point = new egret.Point();
    private Stage01Background: egret.Bitmap;
    private MoveTime = 0;
    private map01: GameMap;
    private astar: AStar;
    private tileX: number;
    private tileY: number;
    private tileSize = 64;
    private ifFindAWay: boolean = false;
    private currentPath: number = 0;
    private movingTime = 32;
    private ifOnGoal = false;
    private ifStartMove = false;
    private playerx: number;
    private playery: number;
    private playerBitX: number;
    private playerBitY: number;


    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }




    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

        this.map01 = new GameMap();
        this.addChild(this.map01);
        this.addChild(this.Player.PersonBitmap);
        this.Player.PersonBitmap.x = 0;
        this.Player.PersonBitmap.y = 0;

        this.map01.startTile = this.map01.getTile(0, 0);
        this.map01.endTile = this.map01.getTile(0, 0);

        this.astar = new AStar();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            this.ifStartMove = true;
            this.playerx = Math.floor(this.Player.PersonBitmap.x / this.tileSize);
            this.playery = Math.floor(this.Player.PersonBitmap.y / this.tileSize);
            this.playerBitX = this.Player.PersonBitmap.x;
            this.playerBitY = this.Player.PersonBitmap.y;
            this.map01.startTile = this.map01.getTile(this.playerx, this.playery);
            this.currentPath = 0;
            this.EventPoint.x = e.stageX;
            this.EventPoint.y = e.stageY;
            this.tileX = Math.floor(this.EventPoint.x / this.tileSize);
            this.tileY = Math.floor(this.EventPoint.y / this.tileSize);

            this.map01.endTile = this.map01.getTile(this.tileX, this.tileY);
            this.ifFindAWay = this.astar.findPath(this.map01);
            if (this.ifFindAWay) {
                this.Player.SetState(new WalkingState(), this);
                this.currentPath = 0;
            }

            for (let i = 0; i < this.astar.pathArray.length; i++) {
                console.log(this.astar.pathArray[i].x + " And " + this.astar.pathArray[i].y);
            }
            if (this.ifFindAWay)
                this.map01.startTile = this.map01.endTile;
        }, this)

        this.PlayerMove();
        this.PlayerAnimation();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public PlayerMove() {
        var self: any = this;

        egret.Ticker.getInstance().register(() => {
            if (this.ifStartMove && self.ifFindAWay) {
                if (self.currentPath < self.astar.pathArray.length - 1) {
                    var distanceX = self.astar.pathArray[self.currentPath + 1].x - self.astar.pathArray[self.currentPath].x;
                    var distanceY = self.astar.pathArray[self.currentPath + 1].y - self.astar.pathArray[self.currentPath].y;

                    if (distanceX > 0) {
                        self.Player.SetRightOrLeftState(new GoRightState(), self);
                    }
                    if (distanceX <= 0) {
                        self.Player.SetRightOrLeftState(new GoLeftState(), self);
                    }
                    if (!self.IfOnGoal(self.astar.pathArray[self.currentPath + 1])) {
                        self.Player.PersonBitmap.x += distanceX / self.movingTime;
                        self.Player.PersonBitmap.y += distanceY / self.movingTime;
                    }
                    else {
                        self.currentPath += 1;
                    }
                }
            }
            if (this.ifStartMove && !self.ifFindAWay) {
                var distanceX = self.map01.startTile.x - self.playerBitX;
                var distanceY = self.map01.startTile.y - self.playerBitY;
                if (distanceX > 0) {
                    self.Player.SetRightOrLeftState(new GoRightState(), self);
                }
                if (distanceX <= 0) {
                    self.Player.SetRightOrLeftState(new GoLeftState(), self);
                }
                if (!self.IfOnGoal(self.map01.startTile)) {
                    self.Player.PersonBitmap.x += distanceX / self.movingTime;
                    self.Player.PersonBitmap.y += distanceY / self.movingTime;
                }
                else
                    self.Player.SetState(new IdleState(), self);
            }
        }, self)

    }



    public PictureMove(pic: egret.Bitmap): void {
        var self: any = this;
        var MapMove: Function = function () {
            egret.Tween.removeTweens(pic);
            var dis = self.Player.PersonBitmap.x - self.EventPoint.x;
            if (self.Player.GetIfGoRight() && pic.x >= - (pic.width - self.stage.stageWidth)) {
                egret.Tween.get(pic).to({ x: pic.x - Math.abs(dis) }, self.MoveTime);
            }

            if (self.Player.GetIfGoLeft() && pic.x <= 0) {
                egret.Tween.get(pic).to({ x: pic.x + Math.abs(dis) }, self.MoveTime);
            }
        }
        MapMove();
    }

    public IfOnGoal(tile: Tile): any {
        var self: any = this;
        if (self.Player.PersonBitmap.x == tile.x && self.Player.PersonBitmap.y == tile.y)
            this.ifOnGoal = true;
        else
            this.ifOnGoal = false;
        return this.ifOnGoal;

    }

    public PlayerAnimation(): void {
        var self: any = this;
        var n = 0;
        var GOR = 0;
        var GOL = 0;
        var frame1 = 0;
        var frame2 = 0;
        var frame3 = 0;
        var standArr = ["01_png", "02_png", "03_png", "04_png", "05_png", "06_png", "07_png", "08_png", "09_png", "10_png"];
        var walkRightArr = ["21_png", "22_png", "23_png", "24_png", "25_png", "26_png", "27_png", "28_png", "29_png", "30_png", "31_png", "2_png", "33_png", "34_png", "35_png"];

        var MoveAnimation: Function = function () {
            egret.Ticker.getInstance().register(() => {
                if (frame1 % 4 == 0) {
                    if (self.Player.GetIfIdle() && !self.Player.GetIfWalk()) {
                        GOR = 0;
                        GOL = 0;
                        var textureName = standArr[n];
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        n++;
                        if (n >= standArr.length) {
                            n = 0;
                        }
                    }

                    if (self.Player.GetIfWalk() && self.Player.GetIfGoRight() && !self.Player.GetIfIdle()) {
                        n = 0;
                        GOL = 0;
                        var textureName = walkRightArr[GOR];
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        GOR++;
                        if (GOR >= walkRightArr.length) {
                            GOR = 0;
                        }
                    }

                    if (self.Player.GetIfWalk() && self.Player.GetIfGoLeft() && !self.Player.GetIfIdle()) {
                        n = 0;
                        GOR = 0;
                        var textureName = walkRightArr[GOL];
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        GOL++;
                        if (GOL >= walkRightArr.length) {
                            GOL = 0;
                        }
                    }
                }

                if (self.IfOnGoal(self.map01.endTile)) {
                    self.Player.SetState(new IdleState(), self);
                }
            }, self);
        }
        var FramePlus: Function = function () {
            egret.Ticker.getInstance().register(() => {
                frame1++;
                if (frame1 == 400)
                    frame1 = 0;
            }, self)
        }
        MoveAnimation();
        FramePlus();
    }
}


