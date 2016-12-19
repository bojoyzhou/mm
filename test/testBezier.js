var canvas = document.getElementById('canvas')
const N = 2
canvas.width = document.body.offsetWidth * N
canvas.height = document.body.offsetHeight * N
var ctx = canvas.getContext('2d')
window.canvas = canvas
window.ctx = ctx
	// ctx.imageSmoothingEnabled = true
let p0 = [874, 614],
	p1 = [899, 614],
	p2 = [899, 310.5],
	p3 = [924, 310.5]
b({
	p0,
	p1,
	p2,
	p3,
	startWidth: 5,
	endWidth: 3,
	segment: 1000
})

function b({
	p0,
	p1,
	p2,
	p3,
	getWidth,
	startWidth,
	endWidth,
	width,
	segment
}) {
	p0 = m(p0, N)
	p1 = m(p1, N)
	p2 = m(p2, N)
	p3 = m(p3, N)
	if (!getWidth) {
		if (startWidth != undefined && endWidth !== undefined) {
			startWidth = startWidth * N
			endWidth = endWidth * N
			getWidth = (t) => {
				return t * (endWidth - startWidth) + startWidth
			}
		}
		if (width) {
			width = width * N
			getWidth = (t) => {
				return width
			}
		}
	}
	if (!getWidth) {
		throw Error('width invalid')
	}
	ctx.beginPath()
	ctx.moveTo.apply(ctx, p0)
	segment = segment || 100
	let t = 0,
		c = 1 / segment
	while (t < 1) {
		draw(t)
		t += c
	}
	draw(1)

	function draw(t) {
		let a = m(p0, Math.pow(1 - t, 3)),
			b = m(p1, 3, t, Math.pow(1 - t, 2)),
			c = m(p2, 3, Math.pow(t, 2), 1 - t),
			d = m(p3, Math.pow(t, 3)),
			w = getWidth(t),
			p = add(a, b, c, d)
		console.log(w)
		ctx.lineWidth = w
		ctx.strokeStyle = "rgb(126, 87, 194)"
		ctx.lineTo.apply(ctx, p)
		ctx.stroke()
	}

	function m(p) {
		let t = 1
		for (let i = 1; i < arguments.length; i++) {
			t *= arguments[i]
		}
		return [p[0] * t, p[1] * t]
	}

	function add() {
		let x = 0,
			y = 0
		for (let i = 0; i < arguments.length; i++) {
			x += arguments[i][0]
			y += arguments[i][1]
		}
		return [x, y]
	}
}