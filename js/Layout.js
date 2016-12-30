import {PH, PW} from './constants'
function layout(node) {
    let { left, top, right, bottom, width, height } = node.getRect(1)
    if (!node.children || !node.children.length) {
        node.outterRect = { left, top, right, bottom, width, height }
        node.childrenRect = {}
        return
    }
    let child = node.children[0],
        firstChildRect = child.getRect(1)
    layout(child)
    let childLeft = left + width + PW
    child.moveTo(childLeft, firstChildRect.top)
    let { outterRect } = child
    for (let i = 1; i < node.children.length; i++) {
        child = node.children[i]
        layout(child)
        let {x, y} = child.moveTo(childLeft, outterRect.bottom + PH - child.outterRect.top + child.getRect(1).top)
        child.outterRect.left += x
        child.outterRect.right += x
        child.outterRect.top += y
        child.outterRect.bottom += y
        right = Math.max(right, outterRect.right)
        outterRect = child.outterRect
    }
    let lastChildRect = child.getRect(1)
    // left = outterRect.left - PW - width
    top = (firstChildRect.bottom + lastChildRect.bottom) / 2 - height
    right = Math.max(right, outterRect.right)
    bottom = outterRect.bottom
    width = right - left
    let outterRectTop = Math.min(top, node.children[0].outterRect.top)
    height = bottom - outterRectTop
    node.set({left, top})
    node.outterRect = { left, top: outterRectTop, right, bottom, width, height }
    if(node.isroot){
        node.emit('layout')
    }
}
export default layout
