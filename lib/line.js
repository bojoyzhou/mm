function clear() {
	var ctx = this
	const {
		width,
		height
	} = ctx.canvas
	ctx.clearRect(0, 0, width, height)
}

function drawLine({
	p0,
	p1,
	width,
	color,
	N
}) {
	N = N || 2
	p0 = m(p0, N)
	p1 = m(p1, N)
	width = width * N
	var ctx = this
	ctx.beginPath()
	ctx.moveTo.apply(ctx, p0)
	ctx.lineWidth = width
	ctx.strokeStyle = color
	ctx.lineTo.apply(ctx, p1)
	ctx.stroke()
}

function drawBezier({
	p0,
	p1,
	p2,
	p3,
	getWidth,
	startWidth,
	endWidth,
	width,
	segment,
	color,
	N
}) {
	const start = Date.now()
	N = N || 2
	var ctx = this
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
	segment = segment || 50
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

		ctx.lineWidth = w
		ctx.strokeStyle = color
		ctx.lineTo.apply(ctx, p)
		ctx.stroke()
	}
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
export default function(ctx) {
	return {
		clear: clear.bind(ctx),
		drawLine: drawLine.bind(ctx),
		drawBezier: drawBezier.bind(ctx)
	}
}
