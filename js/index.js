import EventEmitter from 'events'
import data from './data'
const PW = 100,
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
        this.t = 0
        this.tasks = []
        this.nodes = []
        this.oriCanvas = document.getElementById('nodes')
        this.canvas = document.getElementById('realCanvas')
        this.canvas.width = document.body.offsetWidth
        this.canvas.height = document.body.offsetHeight
        this.ctx = this.canvas.getContext('2d')
        this.oriCtx = this.oriCanvas.getContext('2d')
        this.ischanged = false
        this.run = this.run.bind(this)
        this.run()
    }
    clear(ctx) {
        const { width, height } = ctx.canvas
        ctx.clearRect(0, 0, width, height)
    }
    regist(node) {
        this.nodes.push(node)
    }
    add(task) {
        this.tasks.push(task)
    }
    execute(t, isroll) {
        const task = this.tasks.shift()
        if (!task) {
            return false
        }
        for (let i = 0; i < this.tasks.length; i++) {
            if (task.id == this.tasks[i].id && this.tasks[i].t - task.t < 10) {
                return false
            }
        }
        // if(!isroll){
        //     this.clear()
        // }
        // task.func()
        if (this.tasks[0] && this.tasks[0].t - task.t < t - this.t) {
            // this.execute(t, 1)
            return
        }
        this.clear(this.ctx)
        this.clear(this.oriCtx)
        this.nodes.forEach(node => {
            node.renderDeep()
        })
        return true
    }
    change(){
        this.ischanged = true
    }
    run(t) {
        // if(this.ischanged){
            this.clear(this.oriCtx)
            this.nodes.forEach(node => {
                node.renderDeep()
            })
            this.clear(this.ctx)
            this.ctx.drawImage(this.oriCanvas, 0, 0)
            this.ischanged = false
        // }
        requestAnimationFrame(this.run)
        this.t = t
    }
}

class Node extends EventEmitter {
    static container = document.getElementById('nodes');
    static id = 1;
    static padding = 4;
    static frameManager = null;
    static setCanvas() {
        Node.canvas = document.getElementById('nodes')
        Node.canvas.width = document.body.offsetWidth
        Node.canvas.height = document.body.offsetHeight
        Node.ctx = Node.canvas.getContext('2d')
    }
    constructor(text, isroot) {
        super()
        this.children = []
        this.id = Node.id
        Node.id += 1
        this.isroot = !!isroot
        this.canvas = Node.canvas
        this.ctx = Node.ctx
        this.frameManager = Node.frameManager
        this.fontSize = 16
        this.ctx.font = `600 ${this.fontSize}px Arial`
        this.ctx.fillStyle = "rgba(0, 0, 0, .75)"
        this.ctx.textAlign = "left"
        this.left = 0
        this.top = 0
        this.size = 10
        this.isleft = false
        this.lineHeight = 20
        this.setText(text)
        this.applyStyle = this.applyStyle.bind(this)

        this.isover = false
        this.isdown = false
        this.isdragstart = false
        this.bindEvent()

        this.startLeft = this.left
        this.startTop = this.top
        this.startTime = 0
        this.duration = 300
        this.beforeDragX = 0
        this.beforeDragY = 0
    }
    getPos() {
        let r = (Date.now() - this.startTime) / this.duration,
            left, top
        if (r > 1) {
            left = this.left
            top = this.top
        } else {
            left = this.startLeft + (this.left - this.startLeft) * r,
                top = this.startTop + (this.top - this.startTop) * r
        }
        return { left, top }
    }
    bindEvent() {
        this.on('mouseover', this.onMouseOver)
        this.on('mouseleave', this.onMouseLeave)
        this.on('mouseup', this.onMouseUp)
        this.on('mousedown', this.onMouseDown)
        this.on('drag', this.onDrag)
        this.on('dragstart', this.onDragStart)
        this.on('dragdrop', this.onDragDrop)
    }
    onMouseOver() {
        this.isover = true
    }
    onMouseLeave() {
        this.fontSize = 16
        this.isover = false
    }
    onMouseUp() {
        this.isdown = false
    }
    onMouseDown() {
        this.isdown = true
    }
    onDragStart(e) {
        this.beforeDragX = this.left
        this.beforeDragY = this.top
        this.beforeDragParent = this.parent
        this.beforeDragIndex = this.index
        this.isdragstart = true

        let pos = this.pos = [
            [this.beforeDragX, this.beforeDragY, this]
        ]

        let prev = this.prev(),
            next = this.next()
        while (prev) {
            pos.unshift([prev.left, prev.top, prev])
            prev = prev.prev()
        }
        while (next) {
            pos.push([next.left, next.top, next])
            next = next.next()
        }
    }
    overon(node){
        this.overnode = node
    }
    onDrag(e) {
        this.moveBy(e.movementX, e.movementY)
        if(e.overNode){
            e.overNode.fontSize = 18
        }
        this.overon(e.overNode)
        if (this.isroot) {
            return
        }
        if (this.parent && this.parent.isroot && Math.abs(this.left - this.beforeDragX) > Math.abs(this.beforeDragX - this.parent.left)) {
            console.log("over")
        }
        let children = this.parent.children,
            index = this.index
        let a = children.slice(0).sort((a, b) => {
            return a.top > b.top
        }).map((child, idx) => {
            if (child.index == index) {
                return [child.text, 'ccc'].join(', ')
            }
            child.moveTo.apply(child, this.pos[idx])
            return [child.text, this.pos[idx]].join(', ')
        })
    }
    onDragDrop() {
        this.isdragstart = false
        this.isdown = false

        if(this.overnode){
            this.remove()
            this.overnode.addNode(this)
        }else{
            this.parent.children.sort((a, b) => {
                return a.top > b.top
            })
            this.parent.children.forEach((child, idx) => {
                child.index = idx
            })
            let next = this.next(),
                prev = this.prev(),
                parent = this.parent
            if(next){
                let {left, t_top} = next
                this.moveTo(left, t_top - PH - this.t_height / 2 - this.height / 2)
            }else if(prev){
                let {left, t_top, t_height} = prev
                this.moveTo(left, t_top + t_height + PH)
            }else if(parent){
                let {left, top} = parent
                this.moveTo(left + parent.width + PW, top)
            }
        }
        this.root.layout()
    }
    getWidth() {
        this.ctx.font = `600 ${this.fontSize}px Arial`
        this.ctx.fillStyle = "rgba(0, 0, 0, .75)"
        this.ctx.textAlign = "left"
        this.height = this.text.length * this.lineHeight
        return Math.max.apply(Math, this.text.map((t, idx) => {
            return this.ctx.measureText(t).width + Node.padding * 2
        }))
    }
    setText(text) {
        this.text = text.split('\n')
        const width = this.getWidth()
        this.children.forEach(child => (child.moveBy(width - this.width, 0)))
        this.width = width
    }
    getEdgeP() {
        const { left, top } = this.getPos()
        const { height, width } = this
        const right = left + width,
            bottom = top + height
        const size = this.size
        if (this.isroot) {
            return [right - width / 4, top + height / 2 + size / 2]
        }
        return [right + 2, bottom + this.size / 2]
    }
    getEdgeC() {
        const { left, top } = this.getPos()
        const { height } = this
        const bottom = top + height
        const size = this.size
        return [left - 2, bottom + this.size / 2]
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
        }
        if (this.isroot) {
            n.color = randomColor()
        } else {
            n.color = this.color
        }
        n.size = Math.max(10 - n.level, 2)
        n.parent = this
        n.index = this.children.length
        this.children.push(n)
        return n
    }
    addNode(n){
        n.parent = this
        n.level = this.level + 1
        n.root = this.root
        n.data = this.data
        n.color = this.color
        n.index = this.children.length
        this.children.push(n)
        if(this.isroot){
            this.color = randomColor()
        }
        n.flush()
    }
    flush(){
        this.level = this.parent.level + 1
        this.color = this.parent.color
        this.size = Math.max(10 - this.level, 2)
        this.children.forEach(child => {
            child.flush()
        })
    }
    removeNode(n){
        this.children = this.children.filter(child => (child !== n))
        this.children.forEach((n, idx) => {
            n.index = idx
        })
    }
    remove(){
        this.parent.removeNode(this)
    }
    prev() {
        if (this.index >= 1) {
            return this.parent.children[this.index - 1]
        }
        return null
    }
    next() {
        if (this.index < this.parent.children.length - 1) {
            return this.parent.children[this.index + 1]
        }
        return null
    }
    resize() {
        // const { left, top, width, height } = this.elem.getBoundingClientRect()
        // this.left = left
        // this.top = top
        // this.width = width
        // this.height = height
    }
    moveBy(x, y) {
        this.children.forEach(child => child.moveBy(x, y))
        this.setPos(this.left + x, this.top + y)
    }
    moveTo(left, top) {
        this.children.forEach(child => child.moveBy(left - this.left, top - this.top))
        this.setPos(left, top)
    }
    stopAnimate(){
        this.startLeft = this.left
        this.startTop = this.top
        this.startTime = Date.now()
    }
    setPos(left, top) {
        if(Date.now() - this.startTime > 300){
            this.startLeft = this.left
            this.startTop = this.top
            this.startTime = Date.now()
        }
        this.left = left
        this.top = top
        this.t_top = this.top + this.height / 2 - this.t_height / 2
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
    renderArc() {
        let p0 = this.parent.getEdgeP(),
            p3 = this.getEdgeC(),
            p4 = this.getEdgeP(),
            color = this.color,
            width = this.size,
            p1, p2
        if (this.isleft) {
            p1 = [p0[0] - 70, p0[1]]
            p2 = [p3[0] + 40, p3[1]]
        } else {
            p1 = [p0[0] + 70, p0[1]]
            p2 = [p3[0] - 40, p3[1]]
        }
        if (this.parent.isroot) {
            p1 = p0
        }
        const ctx = this.ctx
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.moveTo.apply(ctx, p0)
        ctx.bezierCurveTo.apply(ctx, [...p1, ...p2, ...p3])
        ctx.lineTo.apply(ctx, p4)
        ctx.stroke()
    }
    drawBezier({
        p0,
        p1,
        p2,
        p3,
        color,
        width
    }) {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.moveTo.apply(ctx, p0)
        ctx.bezierCurveTo.apply(ctx, [...p1, ...p2, ...p3])
        ctx.stroke()
    }
    renderLine() {
        let p0 = this.getEdgeP(),
            p1 = this.getEdgeC(),
            color = this.color,
            width = this.size

        const ctx = this.ctx
        ctx.beginPath()
        ctx.moveTo.apply(ctx, p0)
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.lineTo.apply(ctx, p1)
        ctx.stroke()
    }
    applyStyle() {
        const { left, top } = this.getPos()
        const ctx = this.ctx
        if (this.isroot) {
            this.renderBox()
        }
        if (!this.isroot) {
            this.renderArc()
            this.renderLine()
        }
        ctx.font = `600 ${this.fontSize}px Arial`
        ctx.fillStyle = "rgba(0, 0, 0, .75)"
        ctx.textAlign = "left"
        this.text.forEach((t, idx) => {
            ctx.fillText(t, left + Node.padding, top + idx * this.lineHeight + this.fontSize)
        })
    }
    renderBox() {
        const round = 5
        const ctx = this.ctx
        let { left, top } = this.getPos()
        let { width, height } = this
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
    renderDeep() {
        if(this.display === false){
            return
        }
        this.children.forEach(child => child.renderDeep())
        this.applyStyle()
    }
    render() {
        this.frameManager.add(new Task({
            id: this.id,
            func: this.applyStyle,
            t: Date.now()
        }), this)
    }
    scrollIntoCenter() {
        this.moveTo(this.canvas.width / 2, this.canvas.height / 2)
    }
    layout() {
        if (!this.children.length) {
            this.t_top = this.top
            this.t_height = this.height
            this.t_bottom = this.top + this.height
            this.tc_height = 0
            return
        }
        let child = this.children[0]

        child.layout()
        let { top, t_height, left, height, tc_height } = child,
            fbottom = child.top + child.height
        this.t_top = child.t_top
        this.tc_height = child.tc_height || child.height
        this.t_bottom = child.t_top + child.tc_height
        for (let i = 1; i < this.children.length; i++) {
            child = this.children[i]
            child.layout()
            // top = top + t_height / 2 + height + child.t_height / 2 - this.height + PH
            top = top + height + (t_height - tc_height) / 2 + PH + child.tc_height + (child.t_height - child.tc_height) / 2 - child.height
            child.moveTo(left, top)
            height = child.height
            t_height = child.t_height
            tc_height = child.tc_height
        }
        let bottom = top + height
        this.t_height = top + t_height - this.t_top
        this.setPos(left - PW - this.width, (fbottom + bottom) / 2 - this.height)
    }
    mapCoor() {
        return [this.left, this.top, this.left + this.width, this.top + this.height]
    }
    hide(){
        this.display = false
    }
    show(){
        this.display = true
    }
    clone(){
        var n = new Node(this.text, this.isroot)
        for(let i in this){
            if(this.hasOwnProperty(i)){
                n[i] = this[i]
            }
        }
        return n
    }
    static parseNode(data, parent) {
        let n = parent.addChild(data.text)
        return data.children.length && [...data.children.map(d => (Node.parseNode(d, n))), n] || n
    }
    static parse(data) {
        let n = new Node(data.text, true)
        n.size = 10
        n.level = 1
        n.root = n
        let nodes = [n]
        return nodes.concat.apply(nodes, data.children.map(d => (Node.parseNode(d, n))))
    }
}
var frameManager = new FrameManage()
Node.frameManager = frameManager
Node.setCanvas()
var nodes = Node.parse(data)
var rootNode = nodes[0]
frameManager.regist(rootNode)
rootNode.layout()
rootNode.moveBy(500, 400)
rootNode.renderDeep()
window.rootNode = rootNode

let isdown = false
document.body.addEventListener('mousedown', e => {
    const { clientX, clientY } = e
    isdown = true
    nodes.map(node => {
        let coor = node.mapCoor()
        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
            node.emit('mousedown')
        }
    })
})
document.body.addEventListener('mouseup', e => {
    const { clientX, clientY } = e
    isdown = false
    nodes.map(node => {
        let coor = node.mapCoor()
        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
            node.emit('mouseup')
        }
        if (node.isdragstart) {
            node.emit('dragdrop', e)
        }
    })
})
document.body.addEventListener('mousemove', e => {
    const { clientX, clientY } = e
    let pointer = false
    let isdrag = false
    nodes.map(node => {
        let coor = node.mapCoor()
        if (coor[0] < clientX && coor[1] < clientY && coor[2] > clientX && coor[3] > clientY) {
            pointer = true
            if (!node.isover && !node.isdragstart) {
                node.emit('mouseover')
            }
            if(!node.isdragstart){
                e.overNode = node
            }
        } else {
            node.isover && node.emit('mouseleave')
        }
    })
    nodes.map(node => {
        if (node.isdown && !node.isdragstart) {
            node.emit('dragstart', e)
        } else if (node.isdown) {
            node.emit('drag', e)
            isdrag = true
        }
    })
    if (pointer) {
        document.body.style.cursor = 'pointer'
    } else if (isdown && !isdrag) {
        document.body.style.cursor = 'pointer'
        rootNode.moveBy(e.movementX, e.movementY)
    } else {
        document.body.style.cursor = 'default'
    }

})
