/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _toConsumableArray2 = __webpack_require__(5);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getPrototypeOf = __webpack_require__(59);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _possibleConstructorReturn2 = __webpack_require__(63);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(88);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classCallCheck2 = __webpack_require__(96);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(97);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _events = __webpack_require__(101);

	var _events2 = _interopRequireDefault(_events);

	var _data = __webpack_require__(102);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PW = 100,
	    PH = 20;
	var colors = ["rgb(244, 67, 54)", "rgb(239, 83, 80)", "rgb(244, 67, 54)", "rgb(229, 57, 53)", "rgb(211, 47, 47)", "rgb(198, 40, 40)", "rgb(183, 28, 28)", "rgb(255, 82, 82)", "rgb(255, 23, 68)", "rgb(213, 0, 0)", "rgb(233, 30, 99)", "rgb(240, 98, 146)", "rgb(236, 64, 122)", "rgb(233, 30, 99)", "rgb(216, 27, 96)", "rgb(194, 24, 91)", "rgb(173, 20, 87)", "rgb(136, 14, 79)", "rgb(255, 64, 129)", "rgb(245, 0, 87)", "rgb(197, 17, 98)", "rgb(156, 39, 176)", "rgb(186, 104, 200)", "rgb(171, 71, 188)", "rgb(156, 39, 176)", "rgb(142, 36, 170)", "rgb(123, 31, 162)", "rgb(106, 27, 154)", "rgb(74, 20, 140)", "rgb(224, 64, 251)", "rgb(213, 0, 249)", "rgb(170, 0, 255)", "rgb(103, 58, 183)", "rgb(149, 117, 205)", "rgb(126, 87, 194)", "rgb(103, 58, 183)", "rgb(94, 53, 177)", "rgb(81, 45, 168)", "rgb(69, 39, 160)", "rgb(49, 27, 146)", "rgb(124, 77, 255)", "rgb(101, 31, 255)", "rgb(98, 0, 234)", "rgb(63, 81, 181)", "rgb(121, 134, 203)", "rgb(92, 107, 192)", "rgb(63, 81, 181)", "rgb(57, 73, 171)", "rgb(48, 63, 159)", "rgb(40, 53, 147)", "rgb(26, 35, 126)", "rgb(83, 109, 254)", "rgb(61, 90, 254)", "rgb(48, 79, 254)", "rgb(33, 150, 243)", "rgb(33, 150, 243)", "rgb(30, 136, 229)", "rgb(25, 118, 210)", "rgb(21, 101, 192)", "rgb(13, 71, 161)", "rgb(68, 138, 255)", "rgb(41, 121, 255)", "rgb(41, 98, 255)", "rgb(3, 169, 244)", "rgb(3, 155, 229)", "rgb(2, 136, 209)", "rgb(2, 119, 189)", "rgb(1, 87, 155)", "rgb(0, 145, 234)", "rgb(0, 188, 212)", "rgb(0, 151, 167)", "rgb(0, 131, 143)", "rgb(0, 96, 100)", "rgb(0, 150, 136)", "rgb(0, 150, 136)", "rgb(0, 137, 123)", "rgb(0, 121, 107)", "rgb(0, 105, 92)", "rgb(0, 77, 64)", "rgb(76, 175, 80)", "rgb(67, 160, 71)", "rgb(56, 142, 60)", "rgb(46, 125, 50)", "rgb(27, 94, 32)", "rgb(139, 195, 74)", "rgb(104, 159, 56)", "rgb(85, 139, 47)", "rgb(51, 105, 30)", "rgb(205, 220, 57)", "rgb(130, 119, 23)", "rgb(255, 235, 59)", "rgb(255, 193, 7)", "rgb(255, 152, 0)", "rgb(239, 108, 0)", "rgb(230, 81, 0)", "rgb(255, 87, 34)", "rgb(255, 87, 34)", "rgb(244, 81, 30)", "rgb(230, 74, 25)", "rgb(216, 67, 21)", "rgb(191, 54, 12)", "rgb(255, 61, 0)", "rgb(221, 44, 0)", "rgb(121, 85, 72)", "rgb(161, 136, 127)", "rgb(141, 110, 99)", "rgb(121, 85, 72)", "rgb(109, 76, 65)", "rgb(93, 64, 55)", "rgb(78, 52, 46)", "rgb(62, 39, 35)", "rgb(158, 158, 158)", "rgb(117, 117, 117)", "rgb(97, 97, 97)", "rgb(66, 66, 66)", "rgb(33, 33, 33)", "rgb(96, 125, 139)", "rgb(120, 144, 156)", "rgb(96, 125, 139)", "rgb(84, 110, 122)", "rgb(69, 90, 100)", "rgb(55, 71, 79)", "rgb(38, 50, 56)", "rgb(0, 0, 0)"];
	var cursor = 0;
	var flag = [];

	function randomColor() {
	    cursor %= colors.length;
	    if (flag[cursor]) {
	        return randomColor();
	    }
	    var color = colors[cursor];
	    cursor += ~~(Math.random() * 100) % 20;
	    return color;
	}

	var Task = function () {
	    function Task(_ref) {
	        var id = _ref.id,
	            func = _ref.func,
	            t = _ref.t;
	        (0, _classCallCheck3.default)(this, Task);

	        this.id = id;
	        this.func = func;
	        this.t = t;
	    }

	    (0, _createClass3.default)(Task, [{
	        key: 'run',
	        value: function run() {
	            this.func();
	        }
	    }]);
	    return Task;
	}();

	var FrameManage = function () {
	    function FrameManage() {
	        (0, _classCallCheck3.default)(this, FrameManage);

	        this.t = 0;
	        this.tasks = [];
	        this.nodes = [];
	        this.oriCanvas = document.getElementById('nodes');
	        this.canvas = document.getElementById('realCanvas');
	        this.canvas.width = document.body.offsetWidth;
	        this.canvas.height = document.body.offsetHeight;
	        this.ctx = this.canvas.getContext('2d');
	        this.oriCtx = this.oriCanvas.getContext('2d');
	        this.run = this.run.bind(this);
	        this.run();
	    }

	    (0, _createClass3.default)(FrameManage, [{
	        key: 'clear',
	        value: function clear(ctx) {
	            var _ctx$canvas = ctx.canvas,
	                width = _ctx$canvas.width,
	                height = _ctx$canvas.height;

	            ctx.clearRect(0, 0, width, height);
	        }
	    }, {
	        key: 'regist',
	        value: function regist(node) {
	            this.nodes.push(node);
	        }
	    }, {
	        key: 'add',
	        value: function add(task) {
	            this.tasks.push(task);
	        }
	    }, {
	        key: 'execute',
	        value: function execute(t, isroll) {
	            var task = this.tasks.shift();
	            if (!task) {
	                return false;
	            }
	            for (var i = 0; i < this.tasks.length; i++) {
	                if (task.id == this.tasks[i].id && this.tasks[i].t - task.t < 10) {
	                    return false;
	                }
	            }
	            // if(!isroll){
	            //     this.clear()
	            // }
	            // task.func()
	            if (this.tasks[0] && this.tasks[0].t - task.t < t - this.t) {
	                // this.execute(t, 1)
	                return;
	            }
	            this.clear(this.ctx);
	            this.clear(this.oriCtx);
	            this.nodes.forEach(function (node) {
	                node.renderDeep();
	            });
	            return true;
	        }
	    }, {
	        key: 'run',
	        value: function run(t) {
	            this.clear(this.oriCtx);
	            this.nodes.forEach(function (node) {
	                node.renderDeep();
	            });
	            this.clear(this.ctx);
	            this.ctx.drawImage(this.oriCanvas, 0, 0);
	            requestAnimationFrame(this.run);
	            this.t = t;
	        }
	    }]);
	    return FrameManage;
	}();

	var Node = function (_EventEmitter) {
	    (0, _inherits3.default)(Node, _EventEmitter);
	    (0, _createClass3.default)(Node, null, [{
	        key: 'setCanvas',
	        value: function setCanvas() {
	            Node.canvas = document.getElementById('nodes');
	            Node.canvas.width = document.body.offsetWidth;
	            Node.canvas.height = document.body.offsetHeight;
	            Node.ctx = Node.canvas.getContext('2d');
	        }
	    }]);

	    function Node(text, isroot) {
	        (0, _classCallCheck3.default)(this, Node);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Node.__proto__ || (0, _getPrototypeOf2.default)(Node)).call(this));

	        _this.children = [];
	        _this.text = text;
	        _this.id = Node.id;
	        Node.id += 1;
	        _this.isroot = !!isroot;
	        _this.canvas = Node.canvas;
	        _this.ctx = Node.ctx;
	        _this.frameManager = Node.frameManager;
	        _this.fontSize = 16;
	        _this.ctx.font = '600 ' + _this.fontSize + 'px Arial';
	        _this.ctx.fillStyle = "rgba(0, 0, 0, .75)";
	        _this.ctx.textAlign = "left";
	        _this.height = 20;
	        _this.left = 0;
	        _this.top = 0;
	        _this.size = 10;
	        _this.width = _this.getWidth();
	        _this.isleft = false;
	        _this.applyStyle = _this.applyStyle.bind(_this);

	        _this.isover = false;
	        _this.isdown = false;
	        _this.isdragstart = false;
	        _this.bindEvent();

	        _this.startLeft = _this.left;
	        _this.startTop = _this.top;
	        _this.startTime = 0;
	        _this.duration = 300;
	        _this.beforeDragX = 0;
	        _this.beforeDragY = 0;
	        return _this;
	    }

	    (0, _createClass3.default)(Node, [{
	        key: 'getPos',
	        value: function getPos() {
	            var r = (Date.now() - this.startTime) / this.duration,
	                left = void 0,
	                top = void 0;
	            if (r > 1) {
	                left = this.left;
	                top = this.top;
	            } else {
	                left = this.startLeft + (this.left - this.startLeft) * r, top = this.startTop + (this.top - this.startTop) * r;
	            }
	            return { left: left, top: top };
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            this.on('mouseover', this.onMouseOver);
	            this.on('mouseleave', this.onMouseLeave);
	            this.on('mouseup', this.onMouseUp);
	            this.on('mousedown', this.onMouseDown);
	            this.on('drag', this.onDrag);
	            this.on('dragstart', this.onDragStart);
	            this.on('dragdrop', this.onDragDrop);
	        }
	    }, {
	        key: 'onMouseOver',
	        value: function onMouseOver() {
	            this.isover = true;
	        }
	    }, {
	        key: 'onMouseLeave',
	        value: function onMouseLeave() {
	            this.isover = false;
	        }
	    }, {
	        key: 'onMouseUp',
	        value: function onMouseUp() {
	            this.isdown = false;
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown() {
	            this.isdown = true;
	        }
	    }, {
	        key: 'onDragStart',
	        value: function onDragStart(e) {
	            this.beforeDragX = this.left;
	            this.beforeDragY = this.top;
	            this.beforeDragParent = this.parent;
	            this.beforeDragIndex = this.index;
	            this.isdragstart = true;

	            var pos = this.pos = [[this.beforeDragX, this.beforeDragY, this]];

	            var prev = this.prev(),
	                next = this.next();
	            while (prev) {
	                pos.unshift([prev.left, prev.top, prev]);
	                prev = prev.prev();
	            }
	            while (next) {
	                pos.push([next.left, next.top, next]);
	                next = next.next();
	            }
	        }
	    }, {
	        key: 'onDrag',
	        value: function onDrag(e) {
	            var _this2 = this;

	            this.moveBy(e.movementX, e.movementY);
	            if (this.isroot) {
	                return;
	            }
	            if (this.parent && this.parent.isroot && Math.abs(this.left - this.beforeDragX) > Math.abs(this.beforeDragX - this.parent.left)) {
	                console.log("over");
	            }
	            var children = this.parent.children,
	                index = this.index;
	            var a = children.slice(0).sort(function (a, b) {
	                return a.top > b.top;
	            }).map(function (child, idx) {
	                if (child.index == index) {
	                    return [child.text, 'ccc'].join(', ');
	                }
	                child.moveTo.apply(child, _this2.pos[idx]);
	                return [child.text, _this2.pos[idx]].join(', ');
	            });
	        }
	    }, {
	        key: 'onDragDrop',
	        value: function onDragDrop() {
	            this.isdragstart = false;
	            this.isdown = false;
	            this.parent.children.sort(function (a, b) {
	                return a.top > b.top;
	            });
	            this.parent.children.forEach(function (child, idx) {
	                child.index = idx;
	            });
	            var next = this.next(),
	                prev = this.prev(),
	                parent = this.parent;
	            if (next) {
	                var left = next.left,
	                    t_top = next.t_top;

	                this.moveTo(left, t_top - PH - this.t_height / 2 - this.height / 2);
	            } else if (prev) {
	                var _left = prev.left,
	                    _t_top = prev.t_top,
	                    t_height = prev.t_height;

	                this.moveTo(_left, _t_top + t_height + PH);
	            } else if (parent) {
	                var _left2 = parent.left,
	                    top = parent.top;

	                this.moveTo(_left2 + parent.width + PW, top);
	            }
	            // this.stopAnimate()
	            this.root.layout();
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            this.ctx.font = '600 ' + this.fontSize + 'px Arial';
	            this.ctx.fillStyle = "rgba(0, 0, 0, .75)";
	            this.ctx.textAlign = "left";
	            return this.ctx.measureText(this.text).width + Node.padding * 2;
	        }
	    }, {
	        key: 'setText',
	        value: function setText(text) {
	            var _this3 = this;

	            this.text = text;
	            var width = this.getWidth();
	            this.children.forEach(function (child) {
	                return child.moveBy(width - _this3.width, 0);
	            });
	            this.width = width;
	        }
	    }, {
	        key: 'getEdgeP',
	        value: function getEdgeP() {
	            var _getPos = this.getPos(),
	                left = _getPos.left,
	                top = _getPos.top;

	            var height = this.height,
	                width = this.width;

	            var right = left + width,
	                bottom = top + height;
	            var size = this.size;
	            if (this.isroot) {
	                return [right - width / 4, top + height / 2 + size / 2];
	            }
	            return [right + 2, bottom + this.size / 2];
	        }
	    }, {
	        key: 'getEdgeC',
	        value: function getEdgeC() {
	            var _getPos2 = this.getPos(),
	                left = _getPos2.left,
	                top = _getPos2.top;

	            var height = this.height;

	            var bottom = top + height;
	            var size = this.size;
	            return [left - 2, bottom + this.size / 2];
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(text) {
	            var n = void 0;
	            if (this.isdata) {
	                n = new Node(text, true);
	                n.root = n;
	                n.level = 1;
	                n.data = this;
	            } else {
	                n = new Node(text);
	                n.level = this.level + 1;
	                n.root = this.root;
	                n.parent = this;
	                n.data = this.data;
	                n.color = this.color;
	            }
	            if (this.isroot) {
	                n.color = randomColor();
	            } else {
	                n.color = this.color;
	            }
	            n.size = Math.max(10 - n.level, 2);
	            n.parent = this;
	            n.index = this.children.length;
	            this.children.push(n);
	            return n;
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            if (this.index >= 1) {
	                return this.parent.children[this.index - 1];
	            }
	            return null;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            if (this.index < this.parent.children.length - 1) {
	                return this.parent.children[this.index + 1];
	            }
	            return null;
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            // const { left, top, width, height } = this.elem.getBoundingClientRect()
	            // this.left = left
	            // this.top = top
	            // this.width = width
	            // this.height = height
	        }
	    }, {
	        key: 'moveBy',
	        value: function moveBy(x, y) {
	            this.children.forEach(function (child) {
	                return child.moveBy(x, y);
	            });
	            this.setPos(this.left + x, this.top + y);
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top) {
	            var _this4 = this;

	            this.children.forEach(function (child) {
	                return child.moveBy(left - _this4.left, top - _this4.top);
	            });
	            this.setPos(left, top);
	        }
	    }, {
	        key: 'stopAnimate',
	        value: function stopAnimate() {
	            this.startLeft = this.left;
	            this.startTop = this.top;
	            this.startTime = Date.now();
	        }
	    }, {
	        key: 'setPos',
	        value: function setPos(left, top) {
	            if (Date.now() - this.startTime > 300) {
	                this.startLeft = this.left;
	                this.startTop = this.top;
	                this.startTime = Date.now();
	            }
	            this.left = left;
	            this.top = top;
	            this.t_top = this.top + this.height / 2 - this.t_height / 2;
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement(text) {
	            var elem = document.createElement('div');
	            elem.classList.add('node');
	            if (this.isroot) {
	                elem.classList.add('root');
	            }
	            elem.textContent = text;
	            elem.setAttribute('id', 'node-' + this.id);
	            this.container.appendChild(elem);
	            return elem;
	        }
	    }, {
	        key: 'renderArc',
	        value: function renderArc() {
	            var p0 = this.parent.getEdgeP(),
	                p3 = this.getEdgeC(),
	                p4 = this.getEdgeP(),
	                color = this.color,
	                width = this.size,
	                p1 = void 0,
	                p2 = void 0;
	            if (this.isleft) {
	                p1 = [p0[0] - 70, p0[1]];
	                p2 = [p3[0] + 40, p3[1]];
	            } else {
	                p1 = [p0[0] + 70, p0[1]];
	                p2 = [p3[0] - 40, p3[1]];
	            }
	            if (this.parent.isroot) {
	                p1 = p0;
	            }
	            var ctx = this.ctx;
	            ctx.beginPath();
	            ctx.lineWidth = width;
	            ctx.strokeStyle = color;
	            ctx.moveTo.apply(ctx, p0);
	            ctx.bezierCurveTo.apply(ctx, [].concat((0, _toConsumableArray3.default)(p1), (0, _toConsumableArray3.default)(p2), (0, _toConsumableArray3.default)(p3)));
	            ctx.lineTo.apply(ctx, p4);
	            ctx.stroke();
	        }
	    }, {
	        key: 'drawBezier',
	        value: function drawBezier(_ref2) {
	            var p0 = _ref2.p0,
	                p1 = _ref2.p1,
	                p2 = _ref2.p2,
	                p3 = _ref2.p3,
	                color = _ref2.color,
	                width = _ref2.width;

	            var ctx = this.ctx;
	            ctx.beginPath();
	            ctx.lineWidth = width;
	            ctx.strokeStyle = color;
	            ctx.moveTo.apply(ctx, p0);
	            ctx.bezierCurveTo.apply(ctx, [].concat((0, _toConsumableArray3.default)(p1), (0, _toConsumableArray3.default)(p2), (0, _toConsumableArray3.default)(p3)));
	            ctx.stroke();
	        }
	    }, {
	        key: 'renderLine',
	        value: function renderLine() {
	            var p0 = this.getEdgeP(),
	                p1 = this.getEdgeC(),
	                color = this.color,
	                width = this.size;

	            var ctx = this.ctx;
	            ctx.beginPath();
	            ctx.moveTo.apply(ctx, p0);
	            ctx.lineWidth = width;
	            ctx.strokeStyle = color;
	            ctx.lineTo.apply(ctx, p1);
	            ctx.stroke();
	        }
	    }, {
	        key: 'applyStyle',
	        value: function applyStyle() {
	            var _getPos3 = this.getPos(),
	                left = _getPos3.left,
	                top = _getPos3.top;

	            var ctx = this.ctx;
	            if (this.isroot) {
	                this.renderBox();
	            }
	            if (!this.isroot) {
	                this.renderArc();
	                this.renderLine();
	            }
	            ctx.font = '600 ' + this.fontSize + 'px Arial';
	            ctx.fillStyle = "rgba(0, 0, 0, .75)";
	            ctx.textAlign = "left";
	            ctx.fillText(this.text, left + Node.padding, top + this.fontSize);
	        }
	    }, {
	        key: 'renderBox',
	        value: function renderBox() {
	            var round = 5;
	            var ctx = this.ctx;

	            var _getPos4 = this.getPos(),
	                left = _getPos4.left,
	                top = _getPos4.top;

	            var width = this.width,
	                height = this.height;

	            left -= 10;
	            width += 20;
	            top -= 10;
	            height += 20;
	            ctx.shadowColor = "rgba(0, 0, 0, .5)";
	            ctx.shadowBlur = 10;
	            ctx.fillStyle = "white";
	            ctx.beginPath();
	            ctx.moveTo(left + round, top);
	            ctx.lineTo(left + width - round, top);
	            ctx.quadraticCurveTo(left + width, top, left + width, top + round);
	            ctx.lineTo(left + width, top + height - round);
	            ctx.quadraticCurveTo(left + width, top + height, left + width - round, top + height);
	            ctx.lineTo(left + round, top + height);
	            ctx.quadraticCurveTo(left, top + height, left, top + height - round);
	            ctx.lineTo(left, top + round);
	            ctx.quadraticCurveTo(left, top, left + round, top);
	            ctx.fill();
	            ctx.shadowColor = "none";
	            ctx.shadowBlur = 0;
	        }
	    }, {
	        key: 'renderDeep',
	        value: function renderDeep() {
	            if (this.display === false) {
	                return;
	            }
	            this.children.forEach(function (child) {
	                return child.renderDeep();
	            });
	            this.applyStyle();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.frameManager.add(new Task({
	                id: this.id,
	                func: this.applyStyle,
	                t: Date.now()
	            }), this);
	        }
	    }, {
	        key: 'scrollIntoCenter',
	        value: function scrollIntoCenter() {
	            this.moveTo(this.canvas.width / 2, this.canvas.height / 2);
	        }
	    }, {
	        key: 'layout',
	        value: function layout() {
	            if (!this.children.length) {
	                this.t_top = this.top;
	                this.t_height = this.height;
	                return;
	            }
	            var child = this.children[0];

	            child.layout();
	            var _child = child,
	                top = _child.top,
	                t_height = _child.t_height,
	                left = _child.left,
	                height = _child.height,
	                ftop = child.t_top;

	            this.t_top = child.t_top;
	            for (var i = 1; i < this.children.length; i++) {
	                child = this.children[i];
	                child.layout();
	                top = top + t_height / 2 + height / 2 + child.t_height / 2 - this.height / 2 + PH;
	                child.moveTo(left, top);
	                height = child.height;
	                t_height = child.t_height;
	            }
	            var bottom = top + t_height / 2 + height / 2;
	            this.t_height = bottom - this.t_top;
	            this.setPos(left - PW - this.width, (ftop + bottom) / 2 - this.height / 2);
	        }
	    }, {
	        key: 'mapCoor',
	        value: function mapCoor() {
	            return [this.left, this.top, this.left + this.width, this.top + this.height];
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.display = false;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.display = true;
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            var n = new Node(this.text, this.isroot);
	            for (var i in this) {
	                if (this.hasOwnProperty(i)) {
	                    n[i] = this[i];
	                }
	            }
	            return n;
	        }
	    }], [{
	        key: 'parseNode',
	        value: function parseNode(data, parent) {
	            var n = parent.addChild(data.text);
	            return data.children.length && [].concat((0, _toConsumableArray3.default)(data.children.map(function (d) {
	                return Node.parseNode(d, n);
	            })), [n]) || n;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(data) {
	            var n = new Node(data.text, true);
	            n.size = 10;
	            n.level = 1;
	            n.root = n;
	            var nodes = [n];
	            return nodes.concat.apply(nodes, data.children.map(function (d) {
	                return Node.parseNode(d, n);
	            }));
	        }
	    }]);
	    return Node;
	}(_events2.default);

	Node.container = document.getElementById('nodes');
	Node.id = 1;
	Node.padding = 4;
	Node.frameManager = null;

	var frameManager = new FrameManage();
	Node.frameManager = frameManager;
	Node.setCanvas();
	var nodes = Node.parse(_data2.default);
	var rootNode = nodes[0];
	frameManager.regist(rootNode);
	rootNode.layout();
	rootNode.moveBy(500, 400);
	rootNode.renderDeep();
	window.rootNode = rootNode;

	var isdown = false;
	document.body.addEventListener('mousedown', function (e) {
	    var clientX = e.clientX,
	        clientY = e.clientY;

	    isdown = true;
	    nodes.map(function (node) {
	        var coor = node.mapCoor();
	        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
	            node.emit('mousedown');
	        }
	    });
	});
	document.body.addEventListener('mouseup', function (e) {
	    var clientX = e.clientX,
	        clientY = e.clientY;

	    isdown = false;
	    nodes.map(function (node) {
	        var coor = node.mapCoor();
	        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
	            node.emit('mouseup');
	        }
	        if (node.isdragstart) {
	            node.emit('dragdrop', e);
	        }
	    });
	});
	document.body.addEventListener('mousemove', function (e) {
	    var clientX = e.clientX,
	        clientY = e.clientY;

	    var pointer = false;
	    var isdrag = false;
	    nodes.map(function (node) {
	        var coor = node.mapCoor();
	        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
	            pointer = true;
	            if (!node.isover) {
	                node.emit('mouseover');
	            }
	        } else {
	            node.isover && node.emit('mouseleave');
	        }
	        if (node.isdown && !node.isdragstart) {
	            node.emit('dragstart', e);
	        } else if (node.isdown) {
	            node.emit('drag', e);
	            isdrag = true;
	        }
	    });
	    if (pointer) {
	        document.body.style.cursor = 'pointer';
	    } else if (isdown && !isdrag) {
	        document.body.style.cursor = 'pointer';
	        rootNode.moveBy(e.movementX, e.movementY);
	    } else {
	        document.body.style.cursor = 'default';
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(6);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(52);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(9)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(13)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(35);

	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(10)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(49)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(17)
	  , $export        = __webpack_require__(14)
	  , toObject       = __webpack_require__(51)
	  , call           = __webpack_require__(53)
	  , isArrayIter    = __webpack_require__(54)
	  , toLength       = __webpack_require__(41)
	  , createProperty = __webpack_require__(55)
	  , getIterFn      = __webpack_require__(56);

	$export($export.S + $export.F * !__webpack_require__(58)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(49)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(20)
	  , createDesc      = __webpack_require__(28);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(49)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(49)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	module.exports = __webpack_require__(16).Object.getPrototypeOf;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(51)
	  , $getPrototypeOf = __webpack_require__(50);

	__webpack_require__(62)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(64);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(65);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(72);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(67);
	module.exports = __webpack_require__(71).f('iterator');

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(31)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(69)
	  , step             = __webpack_require__(70)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(49);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(87);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(15)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(75).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(48)
	  , uid            = __webpack_require__(45)
	  , wks            = __webpack_require__(49)
	  , wksExt         = __webpack_require__(71)
	  , wksDefine      = __webpack_require__(76)
	  , keyOf          = __webpack_require__(77)
	  , enumKeys       = __webpack_require__(78)
	  , isArray        = __webpack_require__(81)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(33)
	  , gOPNExt        = __webpack_require__(82)
	  , $GOPD          = __webpack_require__(84)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(35)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(83).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(80).f  = $propertyIsEnumerable;
	  __webpack_require__(79).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(13)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(45)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(15)
	  , core           = __webpack_require__(16)
	  , LIBRARY        = __webpack_require__(13)
	  , wksExt         = __webpack_require__(71)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(35)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(35)
	  , gOPS    = __webpack_require__(79)
	  , pIE     = __webpack_require__(80);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 80 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(83).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(36)
	  , hiddenKeys = __webpack_require__(46).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(80)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76)('asyncIterator');

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76)('observable');

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(89);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(93);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(64);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(92).set});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(22)
	  , anObject = __webpack_require__(21);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, __webpack_require__(84).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	var $Object = __webpack_require__(16).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(33)});

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(98);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 101 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var data = {
	    "text": "双击开始",
	    "children": [{
	        "text": "Big Text jylZnode 1",
	        "children": [{
	            "text": "Big Text jylZnode 1.1",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 1.2",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 1.3",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 1.4",
	            "children": []
	        }]
	    }, {
	        "text": "Big Text jylZnode 2",
	        "children": [{
	            "text": "Big Text jylZnode 2.1",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 2.2",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 2.3",
	            "children": []
	        }, {
	            "text": "Big Text jylZnode 2.4",
	            "children": []
	        }]
	    }, {
	        "text": "Big Text jylZnode 3",
	        "children": [{
	            "text": "Big Text jylZnode 3.1",
	            "children": []
	        }]
	    }, {
	        "text": "Big Text jylZnode 4",
	        "children": [{
	            "text": "Big Text jylZnode 3.1",
	            "children": []
	        }]
	    }]
	};

	exports.default = data;

/***/ }
/******/ ]);