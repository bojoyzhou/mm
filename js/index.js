import EventEmitter from 'events'
import data from './data'
const PW = 70,
    PH = 20
const colors = ["rgb(244, 67, 54)", "rgb(239, 83, 80)", "rgb(244, 67, 54)", "rgb(229, 57, 53)", "rgb(211, 47, 47)", "rgb(198, 40, 40)", "rgb(183, 28, 28)", "rgb(255, 82, 82)", "rgb(255, 23, 68)", "rgb(213, 0, 0)", "rgb(233, 30, 99)", "rgb(240, 98, 146)", "rgb(236, 64, 122)", "rgb(233, 30, 99)", "rgb(216, 27, 96)", "rgb(194, 24, 91)", "rgb(173, 20, 87)", "rgb(136, 14, 79)", "rgb(255, 64, 129)", "rgb(245, 0, 87)", "rgb(197, 17, 98)", "rgb(156, 39, 176)", "rgb(186, 104, 200)", "rgb(171, 71, 188)", "rgb(156, 39, 176)", "rgb(142, 36, 170)", "rgb(123, 31, 162)", "rgb(106, 27, 154)", "rgb(74, 20, 140)", "rgb(224, 64, 251)", "rgb(213, 0, 249)", "rgb(170, 0, 255)", "rgb(103, 58, 183)", "rgb(149, 117, 205)", "rgb(126, 87, 194)", "rgb(103, 58, 183)", "rgb(94, 53, 177)", "rgb(81, 45, 168)", "rgb(69, 39, 160)", "rgb(49, 27, 146)", "rgb(124, 77, 255)", "rgb(101, 31, 255)", "rgb(98, 0, 234)", "rgb(63, 81, 181)", "rgb(121, 134, 203)", "rgb(92, 107, 192)", "rgb(63, 81, 181)", "rgb(57, 73, 171)", "rgb(48, 63, 159)", "rgb(40, 53, 147)", "rgb(26, 35, 126)", "rgb(83, 109, 254)", "rgb(61, 90, 254)", "rgb(48, 79, 254)", "rgb(33, 150, 243)", "rgb(33, 150, 243)", "rgb(30, 136, 229)", "rgb(25, 118, 210)", "rgb(21, 101, 192)", "rgb(13, 71, 161)", "rgb(68, 138, 255)", "rgb(41, 121, 255)", "rgb(41, 98, 255)", "rgb(3, 169, 244)", "rgb(3, 155, 229)", "rgb(2, 136, 209)", "rgb(2, 119, 189)", "rgb(1, 87, 155)", "rgb(0, 145, 234)", "rgb(0, 188, 212)", "rgb(0, 151, 167)", "rgb(0, 131, 143)", "rgb(0, 96, 100)", "rgb(0, 150, 136)", "rgb(0, 150, 136)", "rgb(0, 137, 123)", "rgb(0, 121, 107)", "rgb(0, 105, 92)", "rgb(0, 77, 64)", "rgb(76, 175, 80)", "rgb(67, 160, 71)", "rgb(56, 142, 60)", "rgb(46, 125, 50)", "rgb(27, 94, 32)", "rgb(139, 195, 74)", "rgb(104, 159, 56)", "rgb(85, 139, 47)", "rgb(51, 105, 30)", "rgb(205, 220, 57)", "rgb(130, 119, 23)", "rgb(255, 235, 59)", "rgb(255, 193, 7)", "rgb(255, 152, 0)", "rgb(239, 108, 0)", "rgb(230, 81, 0)", "rgb(255, 87, 34)", "rgb(255, 87, 34)", "rgb(244, 81, 30)", "rgb(230, 74, 25)", "rgb(216, 67, 21)", "rgb(191, 54, 12)", "rgb(255, 61, 0)", "rgb(221, 44, 0)", "rgb(121, 85, 72)", "rgb(161, 136, 127)", "rgb(141, 110, 99)", "rgb(121, 85, 72)", "rgb(109, 76, 65)", "rgb(93, 64, 55)", "rgb(78, 52, 46)", "rgb(62, 39, 35)", "rgb(158, 158, 158)", "rgb(117, 117, 117)", "rgb(97, 97, 97)", "rgb(66, 66, 66)", "rgb(33, 33, 33)", "rgb(96, 125, 139)", "rgb(120, 144, 156)", "rgb(96, 125, 139)", "rgb(84, 110, 122)", "rgb(69, 90, 100)", "rgb(55, 71, 79)", "rgb(38, 50, 56)", "rgb(0, 0, 0)"]
let cursor = 0
let flag = []

function randomColor() {
    cursor %= colors.length
    if (flag[cursor]) {
        return randomColor()
    }
    const color = colors[cursor]
    cursor += (~~(Math.random() * 100)) % 20
    return color
}

class Task {
    constructor({ id, func, t }) {
        this.id = id
        this.func = func
        this.t = t
    }
    run() {
        this.func()
    }
}
class FrameManage {
    constructor() {
        this.tasks = []

        this.run = this.run.bind(this)
        this.run()
    }
    add(task) {
        this.tasks.push(task)
    }
    render() {
        const task = this.tasks.shift()
        if (!task) {
            return
        }
        for (let i = 0; i < this.tasks.length; i++) {
            if (task.id == this.tasks[i].id && this.tasks[i].t - task.t < 10) {
                console.log('drop')
                return
            }
        }
        task.func()
    }
    run() {
        this.render()
        requestAnimationFrame(this.run)
    }
}

class Node extends EventEmitter {
    static container = document.getElementById('nodes');
    static id = 1;
    static frameManager = null;
    constructor(text, isroot) {
        super()
        this.children = []
        this.text = text
        this.id = Node.id
        Node.id += 1
        this.isroot = !!isroot
        this.container = Node.container
        this.frameManager = Node.frameManager
        if (!this.isdata) {
            this.elem = this.createElement(this.text)
            this.resize()
        }

        this.applyStyle = this.applyStyle.bind(this)
    }
    addChild(text) {
        let n
        if (this.isdata) {
            n = new Node(text, true)
            n.root = n
            n.level = 1
            n.data = this
        } else {
            n = new Node(text)
            n.level = this.level + 1
            n.root = this.root
            n.parent = this
            n.data = this.data
            n.color = this.color
                // n.edge = new Edge(this, n)
                // this.data.addNode(n)
        }
        if (this.isroot) {
            n.color = randomColor()
        } else {
            n.color = this.color
        }
        n.size = Math.max(10 - n.level, 2)
        n.parent = this
        this.children.push(n)
        return n
    }
    resize() {
        const { left, top, width, height } = this.elem.getBoundingClientRect()
        this.left = left
        this.top = top
        this.width = width
        this.height = height
    }
    moveBy(x, y) {
        this.children.forEach(child => child.moveBy(x, y))
        this.setPos(this.left + x, this.top + y)
    }
    moveTo(left, top) {
        this.children.forEach(child => child.moveBy(left - this.left, top - this.top))
        this.setPos(left, top)
    }
    setPos(left, top) {
        this.left = left
        this.top = top
    }
    createElement(text) {
        let elem = document.createElement('div')
        elem.classList.add('node')
        if (this.isroot) {
            elem.classList.add('root')
        }
        elem.textContent = text
        elem.setAttribute('id', `node-${this.id}`)
        this.container.appendChild(elem)
        return elem
    }
    applyStyle() {
        this.elem.style.left = this.left
        this.elem.style.top = this.top
    }
    applyStyleDeep() {
        this.applyStyle()
        this.children.forEach(child => child.applyStyle())
    }
    render() {
        this.frameManager.add(new Task({
            id: this.id,
            func: this.applyStyle,
            t: Date.now()
        }))
    }
    layout() {
        if (!this.children.length) {
            this.t_top = this.top
            this.t_height = this.height
            return
        }
        let child = this.children[0]

        child.layout()
        let { top, t_height, left } = child,
            ftop = top
        this.t_top = child.t_top
        for (let i = 1; i < this.children.length; i++) {
            child = this.children[i]
            child.moveTo(left, top + t_height + PH)
            child.layout()
            top = top + t_height + PH
            t_height = child.t_height
        }
        let ltop = top + t_height
        this.t_height = ltop - this.t_top
        this.setPos(left - PW - this.width, (ftop + ltop) / 2 - this.height / 2)
    }
    static parseNode(data, parent) {
        let n = parent.addChild(data.text)
        data.children && data.children.forEach(d => {
            Node.parseNode(d, n)
        })
        return n
    }
    static parse(data) {
        let n = new Node(data.text, true)
        data.children.map(d => (Node.parseNode(d, n)))
        return n
    }
}

var frameManager = new FrameManage()
Node.frameManager = frameManager
var rootNode = Node.parse(data)
rootNode.layout()
console.log(window.rootNode = rootNode)
