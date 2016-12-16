const PW = 50,
    PH = 20
const colors = ["rgb(244, 67, 54)","rgb(239, 83, 80)","rgb(244, 67, 54)","rgb(229, 57, 53)","rgb(211, 47, 47)","rgb(198, 40, 40)","rgb(183, 28, 28)","rgb(255, 82, 82)","rgb(255, 23, 68)","rgb(213, 0, 0)","rgb(233, 30, 99)","rgb(240, 98, 146)","rgb(236, 64, 122)","rgb(233, 30, 99)","rgb(216, 27, 96)","rgb(194, 24, 91)","rgb(173, 20, 87)","rgb(136, 14, 79)","rgb(255, 64, 129)","rgb(245, 0, 87)","rgb(197, 17, 98)","rgb(156, 39, 176)","rgb(186, 104, 200)","rgb(171, 71, 188)","rgb(156, 39, 176)","rgb(142, 36, 170)","rgb(123, 31, 162)","rgb(106, 27, 154)","rgb(74, 20, 140)","rgb(224, 64, 251)","rgb(213, 0, 249)","rgb(170, 0, 255)","rgb(103, 58, 183)","rgb(149, 117, 205)","rgb(126, 87, 194)","rgb(103, 58, 183)","rgb(94, 53, 177)","rgb(81, 45, 168)","rgb(69, 39, 160)","rgb(49, 27, 146)","rgb(124, 77, 255)","rgb(101, 31, 255)","rgb(98, 0, 234)","rgb(63, 81, 181)","rgb(121, 134, 203)","rgb(92, 107, 192)","rgb(63, 81, 181)","rgb(57, 73, 171)","rgb(48, 63, 159)","rgb(40, 53, 147)","rgb(26, 35, 126)","rgb(83, 109, 254)","rgb(61, 90, 254)","rgb(48, 79, 254)","rgb(33, 150, 243)","rgb(33, 150, 243)","rgb(30, 136, 229)","rgb(25, 118, 210)","rgb(21, 101, 192)","rgb(13, 71, 161)","rgb(68, 138, 255)","rgb(41, 121, 255)","rgb(41, 98, 255)","rgb(3, 169, 244)","rgb(3, 155, 229)","rgb(2, 136, 209)","rgb(2, 119, 189)","rgb(1, 87, 155)","rgb(0, 145, 234)","rgb(0, 188, 212)","rgb(0, 151, 167)","rgb(0, 131, 143)","rgb(0, 96, 100)","rgb(0, 150, 136)","rgb(0, 150, 136)","rgb(0, 137, 123)","rgb(0, 121, 107)","rgb(0, 105, 92)","rgb(0, 77, 64)","rgb(76, 175, 80)","rgb(67, 160, 71)","rgb(56, 142, 60)","rgb(46, 125, 50)","rgb(27, 94, 32)","rgb(139, 195, 74)","rgb(104, 159, 56)","rgb(85, 139, 47)","rgb(51, 105, 30)","rgb(205, 220, 57)","rgb(130, 119, 23)","rgb(255, 235, 59)","rgb(255, 193, 7)","rgb(255, 152, 0)","rgb(239, 108, 0)","rgb(230, 81, 0)","rgb(255, 87, 34)","rgb(255, 87, 34)","rgb(244, 81, 30)","rgb(230, 74, 25)","rgb(216, 67, 21)","rgb(191, 54, 12)","rgb(255, 61, 0)","rgb(221, 44, 0)","rgb(121, 85, 72)","rgb(161, 136, 127)","rgb(141, 110, 99)","rgb(121, 85, 72)","rgb(109, 76, 65)","rgb(93, 64, 55)","rgb(78, 52, 46)","rgb(62, 39, 35)","rgb(158, 158, 158)","rgb(117, 117, 117)","rgb(97, 97, 97)","rgb(66, 66, 66)","rgb(33, 33, 33)","rgb(96, 125, 139)","rgb(120, 144, 156)","rgb(96, 125, 139)","rgb(84, 110, 122)","rgb(69, 90, 100)","rgb(55, 71, 79)","rgb(38, 50, 56)","rgb(0, 0, 0)"]
let cursor = 0
let flag = []

function randomColor() {
    cursor %= colors.length
    if (flag[cursor]) {
        return randomColor()
    }
    const color =  colors[cursor]
    cursor += parseInt(Math.random() * 100) % 20
    return color
}
class Node {
    static id = 1;
    constructor() {
        this.left = 0
        this.top = 0
        this.text = 'default Value'
        this.children = []
        this.ischanged = true
        this.color = randomColor()
        this.id = Node.id++
    }
    setPos(left, top) {
        if (this.left !== left) {
            this.left = left
            this.ischanged = true
        }
        if (this.top !== top) {
            this.top = top
            this.ischanged = true
        }
        this.resize()
    }
    addNode(node) {
        this.children.push(node)
        this.ischanged = true
        return this
    }
    deleteChild(child) {
        this.children = this.children.filter(item => { item !== child })
        this.ischanged = true
        return this
    }
    moveBy({ x, y }) {
        this.t_left += x
        this.t_top += y
        this.moveTo(this.left + x, this.top + y)
        this.children.forEach(child => {
            child.moveBy({ x, y })
        })
        this.ischanged = true
    }
    resize() {
        this.right = this.left + this.width
        this.bottom = this.top + this.height

        this.t_right = this.t_left + this.t_width
        this.t_bottom = this.t_top + this.t_height
    }
    moveTo(left, top) {
        this.t_left += left - this.left
        this.t_top += top - this.top
        this.left = left
        this.top = top
        this.resize()
        this.ischanged = true
    }
    serialize() {
        const { text, children } = this
        return {
            text,
            children: children.map(child => child.serialize())
        }
    }
    rendered({ width, height }) {
        this.ischanged = false
        this.width = width
        this.height = height
        this.right = width + this.left
        this.bottom = height + this.top
    }
}

class Edge {
    static id = 1
    constructor(a, b) {
        this.d = ''
        this.a = a
        this.b = b
        this.ischanged = true
        this.color = a.color
        this.id = Edge.id++
    }
    setD(d) {
        this.d = d
        this.ischanged = true
    }
    rendered() {
        this.ischanged = false
    }
}

class Data extends Node {
    constructor() {
        super()
        this.data = []
        this.edges = []
        this.all = []
    }
    addNode({ parent, text }) {
        let n = new Node
        n.text = text || 'default value'
        if (parent) {
            parent.addNode(n)
            let edge = new Edge(parent, n)
            this.edges.push(edge)
        } else {
            this.data.push(n)
        }
        this.all.push(n)
        return n
    }
    serialize() {
        return this.data.map(node => node.serialize())
    }
    parseNode(desc, parent) {
        let node = this.addNode({ parent, text: desc.text })
        desc.children.forEach(d => {
            this.parseNode(d, node)
        })
    }
    parse(nodes) {
        nodes.forEach(node => {
            this.parseNode(node)
        })
    }
}

class Calculator {
    static width = document.body.offsetWidth;
    static height = document.body.offsetHeight;
    constructor(data, getElem) {
        this.data = data
        this.getElem = getElem
    }
    calEdge() {
        this.data.edges.forEach(e => {
            // if (e.a.ischanged || e.b.ischanged) {
            let abound = this.getElem(e.a).getBoundingClientRect(),
                bbound = this.getElem(e.b).getBoundingClientRect(),
                acenter = abound.left + abound.width / 2,
                bcenter = bbound.left + bbound.width / 2,
                left, right
            if (acenter < bcenter) {
                left = abound
                right = bbound
            } else {
                left = bbound
                right = abound
            }

            let lrc = [left.right, left.top + left.height / 2],
                rlc = [right.left, right.top + right.height / 2],
                distance = right.left - left.right

            let m = lrc.join(' '),
                c1 = [lrc[0] + distance / 2, lrc[1]].join(' '),
                c2 = [rlc[0] - distance / 2, rlc[1]].join(' '),
                c3 = rlc.join(' ')
            e.setD(`M${m} C ${c1}, ${c2}, ${c3}`)
                // }
        })
    }
    calNode() {
        this.data.data.forEach(rootNode => {
            const offset = this.balance(rootNode)
            const { t_width, t_height, t_left, t_right, t_top, t_bottom } = offset
            rootNode.t_width = t_width
            rootNode.t_height = t_height
            rootNode.t_left = t_left
            rootNode.t_right = t_right
            rootNode.t_top = t_top
            rootNode.t_bottom = t_bottom

            window.rootNode = rootNode

            rootNode.moveBy({
                x: Calculator.width / 2 - t_width / 2 - rootNode.t_left,
                y: Calculator.height / 2 - t_height / 2 - rootNode.t_top
            })
        })
    }
    balance(node) {
        if (!node.children.length) {
            return {
                t_width: node.width,
                t_height: node.height,
                t_left: node.left,
                t_right: node.right,
                t_top: node.top,
                t_bottom: node.bottom
            }
        }
        node.children.forEach(child => {
            const { t_width, t_height, t_left, t_right, t_top, t_bottom } = this.balance(child)
            child.t_width = t_width
            child.t_height = t_height
            child.t_left = t_left
            child.t_right = t_right
            child.t_top = t_top
            child.t_bottom = t_bottom
        })
        const len = node.children.length
        let firstChild = node.children[0],
            lastChild = node.children[len - 1]
        let t_height,
            t_width,
            t_left,
            t_right,
            t_top,
            t_bottom,
            left, top, current
        t_right = firstChild.t_right
        for (let i = 1; i < len; i++) {
            let last = node.children[i - 1]

            current = node.children[i]

            left = last.left
            top = last.top + last.height / 2 + last.t_height / 2 + PH - current.height / 2 + current.t_height / 2

            current.moveBy({ x: left - current.left, y: top - current.top })

            t_right = Math.max(t_right, current.t_right)
        }
        left = firstChild.left - PW - node.width
        top = (firstChild.top + current.top) / 2
        node.setPos(left, top)


        t_top = firstChild.t_top
        t_left = Math.min(firstChild.t_left, node.left)
        t_bottom = lastChild.bottom

        t_width = t_right - t_left
        t_height = t_bottom - t_top
        return { t_top, t_left, t_right, t_bottom, t_width, t_height }
    }
}

class View {
    constructor(data) {
        this.data = data
        this.edges = []
        this.edgeMap = []
        this.elems = []
        this.nodes = []
        this.elemMap = []

        this.svg = document.getElementById('svg')
    }
    getElem(node) {
        const id = node.id
        if (this.elemMap[id]) {
            return this.elemMap[id]
        } else {
            let div = this.createElement()
            this.elemMap[node.id] = div
            this.elems.push(div)
            return div
        }
    }
    createElement() {
        let elem = document.createElement('div')
        elem.classList.add('node')

        document.body.appendChild(elem)
        return elem
    }
    applyStyle(elem, node) {
        const { left, top, text } = node

        elem.style.left = parseInt(left) + 'px'
        elem.style.top = parseInt(top) + 'px'

        elem.textContent = text

        const width = elem.offsetWidth
        const height = elem.offsetHeight

        node.rendered({ width, height })
    }
    createPath(attr) {
        let xmlns = "http://www.w3.org/2000/svg"
        let path = document.createElementNS(xmlns, 'path')
        for (let i in attr) {
            if (attr.hasOwnProperty(i)) {
                path.setAttribute(i, attr[i])
            }
        }
        this.svg.appendChild(path)
        return path
    }
    applyStyleEdge(path, edge) {
        path.setAttribute('d', edge.d)
        edge.rendered()
    }
    getEdge(edge) {
        const id = edge.id
        if (this.edgeMap[id]) {
            return this.edgeMap[id]
        } else {
            let div = this.createPath({
                stroke: edge.color,
                strokeWidth: '3px',
                fill: 'transparent',
                filter: 'url(#blurMe)'
            })
            this.edgeMap[edge.id] = div
            this.edges.push(div)
            return div
        }
    }
    render() {
        let changed = false
        this.data.all.forEach(node => {
            if (node.ischanged) {
                this.applyStyle(this.getElem(node), node)
                changed = true
            }
        })
        return changed
    }
    renderEdge() {
        this.data.edges.forEach(edge => {
            if (edge.ischanged) {
                this.applyStyleEdge(this.getEdge(edge), edge)
            }
        })
    }
}

class Renderer {
    constructor(data) {
        this.data = data
        this.view = new View(data)
        this.calculator = new Calculator(data, (node) => {
            return this.view.getElem(node)
        })
        this.render = this.render.bind(this)
    }
    render() {
        this.view.render()
        this.view.renderEdge()
        this.calculator.calNode()
        this.calculator.calEdge()
        requestAnimationFrame(this.render)
    }
}


var d = new Data()
var data = [{ "text": "default value", "children": [{ "text": "node 1", "children": [{ "text": "node 1.1", "children": [] }, { "text": "node 1.2", "children": [] }, { "text": "node 1.3", "children": [] }, { "text": "node 1.4", "children": [] }] }, { "text": "node 2", "children": [{ "text": "node 2.1", "children": [] }, { "text": "node 2.2", "children": [] }, { "text": "node 2.3", "children": [] }, { "text": "node 2.4", "children": [] }] }, { "text": "node 3", "children": [] }, { "text": "node 4", "children": [] }] }]

d.parse(data)

console.log(d.serialize())


var renderer = new Renderer(d)
window.renderer = renderer
renderer.render()
