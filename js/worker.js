const PW = 50,
    PH = 20
const colors = ["rgb(244, 67, 54)", "rgb(239, 83, 80)", "rgb(244, 67, 54)", "rgb(229, 57, 53)", "rgb(211, 47, 47)", "rgb(198, 40, 40)", "rgb(183, 28, 28)", "rgb(255, 82, 82)", "rgb(255, 23, 68)", "rgb(213, 0, 0)", "rgb(233, 30, 99)", "rgb(240, 98, 146)", "rgb(236, 64, 122)", "rgb(233, 30, 99)", "rgb(216, 27, 96)", "rgb(194, 24, 91)", "rgb(173, 20, 87)", "rgb(136, 14, 79)", "rgb(255, 64, 129)", "rgb(245, 0, 87)", "rgb(197, 17, 98)", "rgb(156, 39, 176)", "rgb(186, 104, 200)", "rgb(171, 71, 188)", "rgb(156, 39, 176)", "rgb(142, 36, 170)", "rgb(123, 31, 162)", "rgb(106, 27, 154)", "rgb(74, 20, 140)", "rgb(224, 64, 251)", "rgb(213, 0, 249)", "rgb(170, 0, 255)", "rgb(103, 58, 183)", "rgb(149, 117, 205)", "rgb(126, 87, 194)", "rgb(103, 58, 183)", "rgb(94, 53, 177)", "rgb(81, 45, 168)", "rgb(69, 39, 160)", "rgb(49, 27, 146)", "rgb(124, 77, 255)", "rgb(101, 31, 255)", "rgb(98, 0, 234)", "rgb(63, 81, 181)", "rgb(121, 134, 203)", "rgb(92, 107, 192)", "rgb(63, 81, 181)", "rgb(57, 73, 171)", "rgb(48, 63, 159)", "rgb(40, 53, 147)", "rgb(26, 35, 126)", "rgb(83, 109, 254)", "rgb(61, 90, 254)", "rgb(48, 79, 254)", "rgb(33, 150, 243)", "rgb(33, 150, 243)", "rgb(30, 136, 229)", "rgb(25, 118, 210)", "rgb(21, 101, 192)", "rgb(13, 71, 161)", "rgb(68, 138, 255)", "rgb(41, 121, 255)", "rgb(41, 98, 255)", "rgb(3, 169, 244)", "rgb(3, 155, 229)", "rgb(2, 136, 209)", "rgb(2, 119, 189)", "rgb(1, 87, 155)", "rgb(0, 145, 234)", "rgb(0, 188, 212)", "rgb(0, 151, 167)", "rgb(0, 131, 143)", "rgb(0, 96, 100)", "rgb(0, 150, 136)", "rgb(0, 150, 136)", "rgb(0, 137, 123)", "rgb(0, 121, 107)", "rgb(0, 105, 92)", "rgb(0, 77, 64)", "rgb(76, 175, 80)", "rgb(67, 160, 71)", "rgb(56, 142, 60)", "rgb(46, 125, 50)", "rgb(27, 94, 32)", "rgb(139, 195, 74)", "rgb(104, 159, 56)", "rgb(85, 139, 47)", "rgb(51, 105, 30)", "rgb(205, 220, 57)", "rgb(130, 119, 23)", "rgb(255, 235, 59)", "rgb(255, 193, 7)", "rgb(255, 152, 0)", "rgb(239, 108, 0)", "rgb(230, 81, 0)", "rgb(255, 87, 34)", "rgb(255, 87, 34)", "rgb(244, 81, 30)", "rgb(230, 74, 25)", "rgb(216, 67, 21)", "rgb(191, 54, 12)", "rgb(255, 61, 0)", "rgb(221, 44, 0)", "rgb(121, 85, 72)", "rgb(161, 136, 127)", "rgb(141, 110, 99)", "rgb(121, 85, 72)", "rgb(109, 76, 65)", "rgb(93, 64, 55)", "rgb(78, 52, 46)", "rgb(62, 39, 35)", "rgb(158, 158, 158)", "rgb(117, 117, 117)", "rgb(97, 97, 97)", "rgb(66, 66, 66)", "rgb(33, 33, 33)", "rgb(96, 125, 139)", "rgb(120, 144, 156)", "rgb(96, 125, 139)", "rgb(84, 110, 122)", "rgb(69, 90, 100)", "rgb(55, 71, 79)", "rgb(38, 50, 56)", "rgb(0, 0, 0)"]
let cursor = 0
let flag = []
let ischanged = true

function randomColor() {
    cursor %= colors.length
    if (flag[cursor]) {
        return randomColor()
    }
    const color = colors[cursor]
    cursor += parseInt(Math.random() * 100) % 20
    return color
}
class Node {
    static id = 1;
    constructor() {
        this.left = 0
        this.top = 0
        this.width = 0
        this.height = 0
        this.resize()
        this.text = '双击开始'
        this.children = []
        this.isroot = false
        this.level = 0
        this.root = null
        this.size = 0
        this.color = randomColor()
        this.id = Node.id++
    }
    setPos(left, top) {
        if (this.left !== left) {
            this.t_left += left - this.left
            this.left = left
        }
        if (this.top !== top) {
            this.t_top += top - this.top
            this.top = top
        }
        this.resize()
    }
    setText(text) {
        this.text = text
    }
    addChild(text) {
        let n = new Node
        if (text) {
            n.setText(text)
        }
        if (this.isData) {
            n.isroot = true
            n.root = n
        } else {
            n.root = this.root
        }
        let globalData = n.globalData = this.globalData
        n.level = this.level + 1
        n.size = Math.max(10 - n.level * 2, 2)
        this.addNode(n)
        if (!this.isData) {
            let edge = new Edge(this, n)
            globalData.edges.push(edge)
        } else {
            globalData.data.push(n)
        }
        globalData.all.push(n)
        return n
    }
    addNode(node) {
        return this.children.push(node)
    }
    deleteChild(child) {
        this.children = this.children.filter(item => {
            item !== child
        })
        return this
    }
    moveBy({
        x,
        y
    }) {
        this.t_left += x
        this.t_top += y
        this.moveTo(this.left + x, this.top + y)
        this.children.forEach(child => {
            child.moveBy({
                x,
                y
            })
        })
    }
    resize() {
        this.right = this.left + this.width
        this.bottom = this.top + this.height

        this.t_right = this.t_left + this.t_width
        this.t_bottom = this.t_top + this.t_height
    }
    moveTo(left, top) {
        this.setPos(left, top)
        this.resize()
    }
    serialize() {
        const {
            text,
            children
        } = this
        return {
            text,
            children: children.map(child => child.serialize())
        }
    }
    rendered({
        width,
        height
    }) {
        this.width = width
        this.height = height
        this.right = width + this.left
        this.bottom = height + this.top
    }
}

class Edge {
    static id = 1;
    constructor(a, b) {
        this.d = {
            p0: [0, 0],
            p1: [0, 0],
            p2: [0, 0],
            p3: [0, 0]
        }
        this.a = a
        this.b = b
        a.nextE = this
        b.preE = this
        if (a.isroot) {
            this.color = b.color
        } else {
            b.color = this.color = a.color
        }
        this.id = Edge.id++
    }
    setD(d) {
        this.d = d
    }
}

class Data extends Node {
    constructor() {
        super()
        this.data = []
        this.edges = []
        this.all = []
        this.isData = true
        this.isroot = false
        this.root = null
        this.globalData = this
    }
    changeNode(node){
        var n = this.all.filter(n => (n.id == node.id))
        n[0].rendered(node)
        ischanged = true
    }
    serialize() {
        return this.data.map(node => node.serialize())
    }
    parseNode(desc, parent) {
        let node = parent.addChild(desc.text)
        desc.children.forEach(d => {
            this.parseNode(d, node)
        })
    }
    parse(nodes) {
        nodes.forEach(node => {
            this.parseNode(node, this)
        })
    }
}
class Calculator {
    constructor(data) {
        this.data = data
    }
    calEdge() {
        this.data.edges.forEach(e => {
            let abound = e.a,
                bbound = e.b,
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

            let lrc = [left.right, left.bottom],
                rlc = [right.left, right.bottom],
                distance = right.left - left.right
            if (e.a.isroot) {
                lrc = [left.right, left.bottom - left.height / 2]
            }
            let p0 = lrc,
                p1 = [lrc[0] + distance / 2, lrc[1]],
                p2 = [rlc[0] - distance / 2, rlc[1]],
                p3 = rlc
            e.setD({
                p0,
                p1,
                p2,
                p3
            })
        })
        return this.data.edges
    }
    calNode() {
        this.data.data.forEach(rootNode => {
            const offset = this.balance(rootNode)
            const {
                t_width,
                t_height,
                t_left,
                t_right,
                t_top,
                t_bottom
            } = offset
            rootNode.t_width = t_width
            rootNode.t_height = t_height
            rootNode.t_left = t_left
            rootNode.t_right = t_right
            rootNode.t_top = t_top
            rootNode.t_bottom = t_bottom

            rootNode.moveBy({
                x: Calculator.width / 2 - t_width / 2 - rootNode.t_left,
                y: Calculator.height / 2 - t_height / 2 - rootNode.t_top
            })
        })
        return this.data.all
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
            const {
                t_width,
                t_height,
                t_left,
                t_right,
                t_top,
                t_bottom
            } = this.balance(child)
            child.t_width = t_width
            child.t_height = t_height
            child.t_left = t_left
            child.t_right = t_right
            child.t_top = t_top
            child.t_bottom = t_bottom
        })
        const len = node.children.length
        let firstChild = node.children[0],
            lastChild = node.children[len - 1],
            firstChildBcr = (firstChild.ischanged || 1) ? firstChild : this.getElem(firstChild).getBoundingClientRect(),
            nodeBcr = (node.ischanged || 1) ? node : this.getElem(node).getBoundingClientRect()
        let t_height,
            t_width,
            t_left,
            t_right,
            t_top,
            t_bottom,
            left, top, current, currentBcr
        t_right = firstChild.t_right
        for (let i = 1; i < len; i++) {
            let last = node.children[i - 1],
                lastBcr = (last.ischanged || 1) ? last : this.getElem(last).getBoundingClientRect()

            current = node.children[i]
            currentBcr = (current.ischanged || 1) ? current : this.getElem(current).getBoundingClientRect()

            left = lastBcr.left
            top = lastBcr.top + lastBcr.height / 2 + last.t_height / 2 + PH - currentBcr.height / 2 + current.t_height / 2

            current.moveBy({
                x: left - currentBcr.left,
                y: top - currentBcr.top
            })
            currentBcr = (current.ischanged || 1) ? current : this.getElem(current).getBoundingClientRect()

            t_right = Math.max(t_right, current.t_right)
        }

        t_top = firstChild.t_top
        t_bottom = currentBcr.bottom

        left = firstChildBcr.left - PW - nodeBcr.width
        top = t_top + (t_bottom - t_top) / 2 - nodeBcr.height / 2
        node.setPos(left, top)
        nodeBcr = (node.ischanged || 1) ? node : this.getElem(node).getBoundingClientRect()

        t_left = Math.min(firstChild.t_left, nodeBcr.left)
        t_width = t_right - t_left
        t_height = t_bottom - t_top
        return {
            t_top,
            t_left,
            t_right,
            t_bottom,
            t_width,
            t_height
        }
    }
}
let cal, d = new Data(), lastnodes, lastedges
self.onmessage = (e) => {
    if (e.data.type == 'init') {
        Calculator.width = e.data.width
        Calculator.height = e.data.height
        d.parse(e.data.data)
        cal = new Calculator(d)
    } else if (e.data.type == 'calculate') {
        let nodes, edges
        if(ischanged){
            nodes = cal.calNode()
            edges = cal.calEdge()
            lastnodes = nodes
            lastedges = edges
        }else{
            nodes = lastnodes
            edges = lastedges
        }
        postMessage({
            type: 'render',
            ischanged,
            nodes,
            edges
        })
        ischanged = false
    } else if(e.data.type == 'changeNode'){
        d.changeNode(e.data.data)
    }
}
