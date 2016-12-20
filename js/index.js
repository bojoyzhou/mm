import makeLines from '../lib/line'

class View {
    constructor(data, {
        drawLine,
        drawBezier,
        clear
    }) {
        this.data = data
        this.edges = []
        this.edgeMap = []
        this.elems = []
        this.nodes = []
        this.elemMap = []
        this.drawBezier = drawBezier
        this.drawLine = drawLine
        this.clear = clear

        this.container = document.getElementById('nodes')
    }
    getElem(node) {
        const id = node.id
        if (this.elemMap[id]) {
            return this.elemMap[id]
        } else {
            let div = this.createElement()
            this.elemMap[node.id] = div
            this.elems.push(div)
            if (node.isroot) {
                div.classList.add('root')
            }
            return div
        }
    }
    createElement() {
        let elem = document.createElement('div')
        elem.classList.add('node')

        this.container.appendChild(elem)
        return elem
    }
    applyStyle(elem, node) {
        const {
            left,
            top,
            text
        } = node

        elem.style.left = left + 'px'
        elem.style.top = top + 'px'
        elem.textContent = text
        if (!node.isroot) {
            let p0 = [node.left - 1, node.bottom],
                p1 = [node.right + 1, node.bottom]
            this.drawLine({
                p0,
                p1,
                style: node.color,
                width: node.size,
            })
        }

        const width = elem.offsetWidth
        const height = elem.offsetHeight
        node.rendered({
            width,
            height
        })
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
    applyStyleEdge(edge) {
        const {
            p0,
            p1,
            p2,
            p3
        } = edge.d
        this.drawBezier({
            p0,
            p1,
            p2,
            p3,
            style: edge.color,
            startWidth: edge.a.size,
            endWidth: edge.b.size
        })
        edge.rendered()
    }
    getEdge(edge) {
        const id = edge.id
        if (this.edgeMap[id]) {
            return this.edgeMap[id]
        } else {
            let path = this.createPath({
                stroke: edge.color,
                fill: 'transparent'
            })
            this.edgeMap[edge.id] = path
            this.edges.push(path)
            return path
        }
    }
    render() {
        this.clear()
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
                this.applyStyleEdge(edge)
            }
        })
    }
}

class Renderer {
    constructor(data, {
        drawLine,
        drawBezier,
        clear
    }, worker) {
        this.data = data
        this.view = new View(data, {
            drawLine,
            drawBezier,
            clear
        })
        // this.calculator = new Calculator(data, (node) => {
        //     return this.view.getElem(node)
        // })
        this.render = this.render.bind(this)
        this.lasttime = Date.now()
        this.worker = worker
    }
    render() {
        this.view.render()
        this.view.renderEdge()
        // worker.postMessage({ type: 'render' })
        let t = Date.now()
        document.title = `${1000 / (t - this.lasttime)} fps`
        this.lasttime = t
        requestAnimationFrame(this.render)
    }
}

var canvas = document.getElementById('canvas')
const N = 2
canvas.width = document.body.offsetWidth * N
canvas.height = document.body.offsetHeight * N
var ctx = canvas.getContext('2d')

let {
    drawLine,
    drawBezier,
    clear
} = makeLines(ctx)

var d = new Data()
var data = [{
    "text": "双击开始",
    "children": [{
        "text": "node 1",
        "children": [{
            "text": "node 1.1",
            "children": []
        }, {
            "text": "node 1.2",
            "children": []
        }, {
            "text": "node 1.3",
            "children": []
        }, {
            "text": "node 1.4",
            "children": []
        }]
    }, {
        "text": "node 2",
        "children": [{
            "text": "node 2.1",
            "children": []
        }, {
            "text": "node 2.2",
            "children": []
        }, {
            "text": "node 2.3",
            "children": []
        }, {
            "text": "node 2.4",
            "children": []
        }]
    }, {
        "text": "node 3",
        "children": []
    }, {
        "text": "node 4",
        "children": []
    }]
}]
d.parse(data)
var MyWorker = require("worker-loader!./worker.js")

var worker = new MyWorker()
window.worker = worker
worker.postMessage({
    type: 'init',
    data: d,
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
})
worker.onmessage = function(e) {
    console.log('in main', e.data)
}

// console.log(d.serialize())


var renderer = new Renderer(d, {
        drawLine,
        drawBezier,
        clear
    }, worker)
    // window.renderer = renderer
renderer.render()
