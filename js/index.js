const PW = 50,
    PH = 20

class Node {
    static id = 1;
    constructor() {
        this.left = 0
        this.top = 0
        this.text = 'default Value'
        this.children = []
        this.ischanged = true
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
        const { left, top, text, children } = this
        return {
            left,
            top,
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
            debugger
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
                stroke: '#F44336',
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
var n1 = d.addNode({})
// n1.setPos(500, 500)
var n1s = [d.addNode({ parent: n1, text: 'node 1' }), d.addNode({ parent: n1, text: 'node 2' }), d.addNode({ parent: n1, text: 'node 3' }), d.addNode({ parent: n1, text: 'node 4' })]
var n2 = n1s[0]
var n2s = [d.addNode({ parent: n2, text: 'node 1.1' }), d.addNode({ parent: n2, text: 'node 1.2' }), d.addNode({ parent: n2, text: 'node 1.3' }), d.addNode({ parent: n2, text: 'node 1.4' })]
var n3 = n1s[1]
var n3s = [d.addNode({ parent: n3, text: 'node 2.1' }), d.addNode({ parent: n3, text: 'node 2.2' }), d.addNode({ parent: n3, text: 'node 2.3' }), d.addNode({ parent: n3, text: 'node 2.4' })]

console.log(d.serialize())


var renderer = new Renderer(d)
window.renderer = renderer
renderer.render()
