const { offsetWidth, offsetHeight } = document.body
const canvas = document.createElement('canvas')
canvas.width = offsetWidth
canvas.height = offsetHeight
const ctx = canvas.getContext('2d')
ctx.textBaseline = "top"
document.body.appendChild(canvas)
window.ctx = ctx
function clear() {
    ctx.clearRect(0, 0, offsetWidth, offsetHeight)
}

function render(node) {
    node.children.forEach(child => {
        render(child)
    })
    if (node.isroot) {
        renderBox(node)
    } else {
        renderLine(node)
    }
    renderText(node)
}

function renderText(node) {
    let nodeRect = node.getRect()
    const { left, top, width, height } = nodeRect
    ctx.font = `600 ${node.fontSize}px Arial`
    ctx.textAlign = "left"
    ctx.fillStyle = "rgba(0, 0, 0, .75)"
    node.text.forEach((t, idx) => {
        ctx.fillText(t, left + node.padding, top + idx * node.lineHeight)
    })
}

function renderLine(node) {
    let p0, p1, p2, p3, p4, left, right, bottom, top
    let parentRect = node.parent.getRect()
    right = parentRect.right
    bottom = parentRect.bottom
    top = parentRect.top
    if (node.parent.isroot) {
        p1 = p0 = [right, (top + bottom) / 2]
    } else {
        p0 = [right, bottom]
        p1 = [right + 40, bottom]
    }
    let nodeRect = node.getRect()
    left = nodeRect.left
    right = nodeRect.right
    bottom = nodeRect.bottom
    p3 = [left, bottom]
    p2 = [left - 70, bottom]
    p4 = [right, bottom]
    let { size, color } = node

    ctx.beginPath()
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.moveTo.apply(ctx, p0)
    ctx.bezierCurveTo.apply(ctx, [...p1, ...p2, ...p3])
    ctx.lineTo.apply(ctx, p4)
    ctx.stroke()
}

function renderBox(node) {
    const round = 5
    let { left, top, width, height } = node.getRect()
    left -= 10
    width += 20
    top -= 10
    height += 20
    ctx.shadowColor = "rgba(0, 0, 0, .5)"
    ctx.shadowBlur = 10
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.moveTo(left + round, top)
    ctx.lineTo(left + width - round, top)
    ctx.quadraticCurveTo(left + width, top, left + width, top + round)
    ctx.lineTo(left + width, top + height - round)
    ctx.quadraticCurveTo(left + width, top + height, left + width - round, top + height)
    ctx.lineTo(left + round, top + height)
    ctx.quadraticCurveTo(left, top + height, left, top + height - round)
    ctx.lineTo(left, top + round)
    ctx.quadraticCurveTo(left, top, left + round, top)
    ctx.fill()
    ctx.shadowColor = "none"
    ctx.shadowBlur = 0
}
let scaleValue = 1
function bind(node){
    ctx.save()
    node.on('scalecontext', value => {
        clear()
        ctx.restore()
        ctx.save()
        ctx.scale(value, value)
        render(node)
    })
    node.on('resetscale', () => {
        clear()
        ctx.restore()
        ctx.save()
        render(node)
    })
}
export { bind, render, clear }
