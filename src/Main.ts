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
    private loadingView: LoadingUI;
    private Player: Character;

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

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        var sky: egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        this.Player = new Character();
        this.addChild(this.Player);
        this.Player.x = stageW / 2;
        this.Player.y = stageH / 2;
        this.Player.Idle();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Walk, this);

    }

    private Walk(event: egret.TouchEvent): void {
        this.Player.Walk(event.stageX, event.stageY);
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

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        var self: any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr: Array<Array<egret.ITextElement>> = [];
        for (var i: number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change: Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
}


class Character extends egret.DisplayObjectContainer {
    public PlayerPic: egret.Bitmap;
    private PlayerSta: characterStateChange = new characterStateChange;
    public WalkSpeed: number = 15;
    public Modle: number = 0;
    public WalkAnmt: Array<egret.Texture> = new Array<egret.Texture>();
    public IdleAnmt: Array<egret.Texture> = new Array<egret.Texture>();

    public constructor() {
        super();
        this.PlayerPic = this.createBitmapByName("01_png");
        this.addChild(this.PlayerPic);
        this.Loading();
        this.anchorOffsetX = this.PlayerPic.width / 2;
        this.anchorOffsetY = this.PlayerPic.height;
    }
    private Loading() {
        var texture: egret.Texture = RES.getRes("01_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("02_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("03_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("04_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("05_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("06_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("07_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("08_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("09_png");
        this.IdleAnmt.push(texture);
        texture = RES.getRes("10_png");
        this.IdleAnmt.push(texture);

        texture = RES.getRes("21_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("22_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("23_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("24_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("25_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("26_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("27_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("28_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("29_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("30_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("31_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("32_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("33_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("34_png");
        this.WalkAnmt.push(texture);
        texture = RES.getRes("35_png");
        this.WalkAnmt.push(texture);
    }

    public PlayAnmt(Anmt: Array<egret.Texture>) {
        var count = 0;
        var Ptc = this.PlayerPic;
        var mdl = this.Modle;
        var timer: egret.Timer = new egret.Timer(100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, Play, this);
        timer.start();

        function Play() {
            Ptc.texture = Anmt[count];
            if (count < Anmt.length - 1) {
                count++;
            }
            else {
                count = 0;
            }
            if (this.Modle != mdl) {
                timer.stop();
            }
        }
    }

    public Walk(x: number, y: number) {
        var WalkState: characterWalkState = new characterWalkState(x, y, this);
        this.PlayerSta.Reload(WalkState);
    }

    public Idle() {
        var IdleState: characterIdleState = new characterIdleState(this);
        this.PlayerSta.Reload(IdleState);
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

interface State {
    onStartState();

    onStopState();
}

class characterWalkState implements State {
    private Targetx: number;
    private Targety: number;
    private Player: Character;
    private timer: egret.Timer;
    private TotleTime: number;
    constructor(x: number, y: number, Player: Character) {
        this.Targety = y;
        this.Targetx = x;
        this.Player = Player;
    }

    onStartState() {
        this.Player.Modle++;
        var distanceX = this.Targetx - this.Player.x;
        var distanceY = this.Targety - this.Player.y;
        if (distanceX > 0) {
            this.Player.scaleX = 1;
        } else {
            this.Player.scaleX = -1;
        }

        var distance = Math.pow(distanceX * distanceX + distanceY * distanceY, 0.5);
        var time: number = distance / this.Player.WalkSpeed;
        this.timer = new egret.Timer(50, time);
        this.TotleTime = time;
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.Player.x += distanceX / time;
            this.Player.y += distanceY / time;
            this.TotleTime--;
            if (this.TotleTime < 1) {
                this.timer.stop();
                if (this.TotleTime > -5) { 
                    this.Player.Idle(); 
                }
            }
        }, this);
        this.timer.start();
        this.Player.PlayAnmt(this.Player.WalkAnmt);
    }

    onStopState() {
        this.TotleTime = -5;
    }
}

class characterIdleState implements State {

    private Player: Character;
    constructor(Player: Character) {
        this.Player = Player;
    }

    onStartState() {
        this.Player.Modle = 0;
        this.Player.PlayAnmt(this.Player.IdleAnmt);

    }

    onStopState() {

    }
}

class characterStateChange {
    private CurrentState: State;

    public Reload(S: State): void {
        if (this.CurrentState) {
            this.CurrentState.onStopState();
        }
        this.CurrentState = S;
        this.CurrentState.onStartState();
    }
}
