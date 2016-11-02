var EventEmitter = (function () {
    function EventEmitter() {
        this._list = [];
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.add = function (o) {
        this._list.push(o);
    };
    p.remove = function (o) {
        var index = this._list.indexOf(o);
        this._list.splice(index);
    };
    p.notify = function (type, data) {
        for (var i = 0; i < this._list.length; i++) {
            var observer = this._list[i];
            observer.onChange(type, data);
        }
    };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addTask = function (task) {
        this._tasks.push(task);
    };
    p.finishTask = function (task) {
        this.notify("finish", task);
    };
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
var TaskPanel = (function () {
    function TaskPanel() {
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (type, task) {
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var Task = (function () {
    function Task() {
    }
    var d = __define,c=Task,p=c.prototype;
    return Task;
}());
egret.registerClass(Task,'Task');
function run() {
    var task = new Task();
    var taskservice = new TaskService();
    var panel = new TaskPanel();
    taskservice.add(panel);
}
//# sourceMappingURL=Observer.js.map