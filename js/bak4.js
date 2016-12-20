import makeLines from '../lib/line'
class View {
    constructor(changeNode) {
        this.container = document.getElementById('nodes')
        this.elemMap = {}

        this.initCanvas()
        this.changeNode = changeNode
    }
    initCanvas() {
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

        this.drawLine = drawLine
        this.drawBezier = drawBezier
        this.clear = clear
    }
    createElement() {
        let elem = document.createElement('div')
        elem.classList.add('node')

        this.container.appendChild(elem)
        return elem
    }
    getElem(node) {
        const id = node.id
        if (this.elemMap[id]) {
            return this.elemMap[id]
        } else {
            let div = this.createElement()
            this.elemMap[node.id] = div
            if (node.isroot) {
                div.classList.add('root')
            }
            return div
        }
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
        if (width != node.width || height != node.height) {
            this.changeNode({
                ...node,
                width,
                height
            })
        }
    }
    renderNode(node) {
        let elem = this.getElem(node)
        this.applyStyle(elem, node)
    }
    renderEdge(edge) {
        this.applyStyleEdge(edge)
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
    }
    render({ nodes, edges }) {
        nodes = nodes || []
        edges = edges || []
        this.clear()
        nodes.forEach(node => {
            this.renderNode(node)
        })
        edges.forEach(edge => {
            this.renderEdge(edge)
        })
    }
}

class Renderer {
    constructor(data) {
        let that = this
        this.worker = new Worker(data)
        this.view = new View((node) => {
            that.worker.postMessage({
                type: 'changeNode',
                data: node
            })
        })
        this.worker.addEventListener('message', function(e) {
            if (e.data.type == 'render') {
                that.ischanged = e.data.ischanged
                that.data = e.data
                that.raf += 1
                that.render()
            }
        })
        this.render = this.render.bind(this)
        this.lasttime = Date.now()
        this.data = {}
        this.raf = 1
    }
    render(raf) {
        raf = raf || this.raf
        if (this.ischanged) {
            this.view.render(this.data)
            this.ischanged = false
        }
        let t = Date.now()
        document.title = `${1000 / (t - this.lasttime)} fps`
        this.lasttime = t
        this.worker.postMessage({ type: 'calculate' })
        if (raf == this.raf) {
            requestAnimationFrame(() => {
                this.render(raf)
            })
        }
    }
}

class Worker {
    constructor(data) {
        var MyWorker = require("worker-loader!./worker.js")
        this.worker = new MyWorker()
        this.worker.postMessage({
            type: 'init',
            data: data,
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        })
    }
    addEventListener() {
        this.worker.addEventListener.apply(this.worker, arguments)
    }
    postMessage() {
        this.worker.postMessage.apply(this.worker, arguments)
    }
}

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


// worker.postMessage(data)

var renderer = new Renderer(data)
renderer.render()
window.renderer = renderer
