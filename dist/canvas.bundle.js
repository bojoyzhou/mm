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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "canvas.html";

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var canvas = document.getElementById('canvas');
	var N = 2;
	canvas.width = document.body.offsetWidth * N;
	canvas.height = document.body.offsetHeight * N;
	var ctx = canvas.getContext('2d');
	window.canvas = canvas;
	window.ctx = ctx;
	// ctx.imageSmoothingEnabled = true
	var p0 = [874, 614],
	    p1 = [899, 614],
	    p2 = [899, 310.5],
	    p3 = [924, 310.5];
	b({
		p0: p0,
		p1: p1,
		p2: p2,
		p3: p3,
		startWidth: 5,
		endWidth: 3,
		segment: 1000
	});

	function b(_ref) {
		var p0 = _ref.p0,
		    p1 = _ref.p1,
		    p2 = _ref.p2,
		    p3 = _ref.p3,
		    getWidth = _ref.getWidth,
		    startWidth = _ref.startWidth,
		    endWidth = _ref.endWidth,
		    width = _ref.width,
		    segment = _ref.segment;

		p0 = m(p0, N);
		p1 = m(p1, N);
		p2 = m(p2, N);
		p3 = m(p3, N);
		if (!getWidth) {
			if (startWidth != undefined && endWidth !== undefined) {
				startWidth = startWidth * N;
				endWidth = endWidth * N;
				getWidth = function getWidth(t) {
					return t * (endWidth - startWidth) + startWidth;
				};
			}
			if (width) {
				width = width * N;
				getWidth = function getWidth(t) {
					return width;
				};
			}
		}
		if (!getWidth) {
			throw Error('width invalid');
		}
		ctx.beginPath();
		ctx.moveTo.apply(ctx, p0);
		segment = segment || 100;
		var t = 0,
		    c = 1 / segment;
		while (t < 1) {
			draw(t);
			t += c;
		}
		draw(1);

		function draw(t) {
			var a = m(p0, Math.pow(1 - t, 3)),
			    b = m(p1, 3, t, Math.pow(1 - t, 2)),
			    c = m(p2, 3, Math.pow(t, 2), 1 - t),
			    d = m(p3, Math.pow(t, 3)),
			    w = getWidth(t),
			    p = add(a, b, c, d);
			console.log(w);
			ctx.lineWidth = w;
			ctx.strokeStyle = "rgb(126, 87, 194)";
			ctx.lineTo.apply(ctx, p);
			ctx.stroke();
		}

		function m(p) {
			var t = 1;
			for (var i = 1; i < arguments.length; i++) {
				t *= arguments[i];
			}
			return [p[0] * t, p[1] * t];
		}

		function add() {
			var x = 0,
			    y = 0;
			for (var i = 0; i < arguments.length; i++) {
				x += arguments[i][0];
				y += arguments[i][1];
			}
			return [x, y];
		}
	}

/***/ }
/******/ ]);