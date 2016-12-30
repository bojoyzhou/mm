import layout from './Layout'
import { bind, render, clear } from './Render'
import Node from './Node'
import proxyEvent from './proxyEvent'

var rootNode = new Node('rootNode')
var frameTime = Date.now()
var t = null
rootNode.on('change', function() {
    frameTime = Date.now()
    if (t) {
        clearTimeout(t)
    }
    t = setTimeout(() => {
        layout(rootNode)
        t = null
    }, 10)
})
rootNode.on('needrender', function() {
    // console.log('needrender')
    frameTime = Date.now()
})
proxyEvent(rootNode)
bind(rootNode)
var n1 = rootNode.addNode('1')
rootNode.addNode('2')
rootNode.addNode('3')
var n4 = rootNode.addNode('4')
n1.addNode('1.5')
n1.addNode('1.6')
n1.addNode('1.7')
n1.addNode('1.8')
n4.addNode('4.9\n4.9\n4.9768978\n4.9\n4.9\n4.9')

layout(rootNode)

function xx(node) {
    console.log(node.text.join('\n'), node.getRect())
    node.children.forEach(n => xx(n))
}
window.xx = xx
window.rootNode = rootNode
window.render = render
rootNode.moveBy(500, 400)

function run() {
    if (Date.now() - frameTime < 500) {
        clear()
        render(rootNode)
    }
    requestAnimationFrame(run)
}
run()
