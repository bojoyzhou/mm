import EventEmitter from 'events'
import emitter from './emitter'
import Node from './Node'
import EdgeWrapper from './Edge'
import Section from './Section'
var Edge = EdgeWrapper('#svg')
var ee = new EventEmitter()
var nodes = []
var section = new Section()
emitter(ee)

function applyStyle(element, style) {
    for (let i in style) {
        element.style[i] = style[i]
    }
}

ee.on('createNode', function({ left, top, text, target }) {
    if (target && !left && !top) {
        let pos = target.node.nextPos()
        left = pos.left
        top = pos.top
    }
    let elem = document.createElement('div')
    elem.classList.add('node')
    elem.textContent = text || '节点'
    applyStyle(elem, { left, top })
    document.body.appendChild(elem)

    const node = new Node(elem, left, top)
    nodes.push(node)
    elem.node = node

    if (target) {
        let edge = new Edge(target.node, node)
        target.node.addEdge(edge)
        node.setEdge(edge)
    }
})
ee.on('editNode',  function({target, e}){
    target.node.changeto(Node.EDIT)
})
ee.on('activeNode', function({ target, e }) {
    target.node.changeto(Node.ACTIVE)
})
ee.on('moveNode', function({ target, e }) {
    target.node.moveBy(e.movementX, e.movementY)
})
ee.on('render', function() {
    nodes.forEach(function(node) {
        node.render()
    })
    section.render()
})
ee.on('startSelection', function({e}){
    section.show()
    section.changeto({
        left: e.clientX,
        top: e.clientY,
        width: 0,
        height: 0
    })
})
ee.on('dragSelection', function({e, startX, startY}){
    section.changeto({
        left: Math.min(e.clientX, startX),
        top: Math.min(e.clientY, startY),
        width: Math.abs(e.clientX - startX),
        height: Math.abs(e.clientY - startY)
    })
})
ee.on('endSelection', function({e}){
    section.hide()
    nodes.forEach(node => {
        if(section.contains(node)){
            node.changeto(Node.ACTIVE)
        }
    })
})
ee.on('reset', function(){
    nodes.forEach(node => {
        node.reset()
    })
})
