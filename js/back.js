import EventEmitter from 'events'

function createSvgElement(tagname, attr) {
    let xmlns = "http://www.w3.org/2000/svg"
    let node = document.createElementNS(xmlns, tagname)
    for (let i in attr) {
        if (attr.hasOwnProperty(i)) {
            node.setAttribute(i, attr[i])
        }
    }
    return node
}

function applyStyle(element, style) {
    for (let i in style) {
        element.style[i] = style[i]
    }
}

function applyEvent(element, target) {
    let raftimer,startX, startY, mo
    element.addEventListener('keypress', keydown, false)
    element.addEventListener('mousedown', md, false)
    element.addEventListener('mouseup', mu, false)
    function keydown(e){
        console.log(e)
        switch(e.code){
            case 'Enter':
                break
            case 'Delete':
                break
            case 'Enter':
                break
            case 'Delete':
                break
            case 'Enter':
                break
            case 'Delete':
                break
        }
    }
    function md(e) {
        if(e.button !== 0){
            return
        }
        let rafid = 1
        let mid = 1

        function raf() {
            rafid += 1
            raftimer = raftimer && requestAnimationFrame(raf)
        }
        raftimer = requestAnimationFrame(raf)
        startX = e.clientX
        startY = e.clientY

        mo = (e) => {
            mid += 1
            if (mid > rafid) {
                mid = rafid
                return
            }
            e.shiftX = e.clientX - startX
            e.shiftY = e.clientY - startY
            startX = e.clientX
            startY = e.clientY
            target.update.apply(target, [e])
            e.preventDefault()
            e.stopPropagation()
            this.onselect=function(){
                return false
            }
            return false
        }
        document.addEventListener('mousemove', mo, false)
        // e.preventDefault()
        // e.stopPropagation()
    }

    function mu() {
        raftimer = null
        startX = startY = 0
        document.removeEventListener('mousemove', mo)
        this.onselect = null
    }
    return function() {
        element.removeEventListener('mousedown', md)
        element.removeEventListener('mouseup', mu)
        element.removeEventListener('click', edit)
    }
}
class Node extends EventEmitter {
    constructor({ text, pos, children, parent }) {
        super()
        children = children || []
        parent = parent || null
        this.emit('before_init')
        this.text = text
        this.pos = pos
        const element = document.createElement('div')
        element.setAttribute('class', 'node')
        element.textContent = text
        element.contentEditable = true
        applyStyle(element, pos)
        this.removeEvent = applyEvent(element, this)
        this.element = element
        this.update = this.update.bind(this)
        this.children = children
        children.forEach(c => {
            c.parent = this
        })
        this.parent = parent
        if (parent) {
            parent.addChild(this)
        }
        this.emit('init')
    }
    addChild(child) {
        this.children.push(child)
    }
    position() {
        let offset = this.element.getBoundingClientRect()
        offset.get = (name) => {
            if (offset[name]) {
                return offset[name]
            }
            switch (name) {
                case 'top-center':
                    return [offset.left + offset.width / 2, offset.top]
                case 'bottom-center':
                    return [offset.left + offset.width / 2, offset.bottom]
                case 'left-center':
                    return [offset.left, offset.top + offset.height / 2]
                case 'right-center':
                    return [offset.right, offset.top + offset.height / 2]
                case 'center-center':
                    return [offset.left + offset.width / 2, offset.top + offset.height / 2]
            }
        }
        return offset
    }
    update(e) {
        this.emit('before_update')
        const x = e.shiftX,
            y = e.shiftY
        const {left, top} = this.position()
        applyStyle(this.element, {left: left + x, top: top + y})
        this.emit('update')
    }
    delete() {
        this.emit('before_delete')
        this.removeEvent()
        this.element.parentNode.removeChild(this.element)
        this.emit('delete')
    }
    render() {
        document.body.appendChild(this.element)
    }
}

class Edge extends EventEmitter {
    constructor(node1, node2) {
        super()
        this.node1 = node1
        this.node2 = node2
        const path = createSvgElement('path', {
            stroke: '#F44336',
            fill: 'transparent',
            filter: 'url(#blurMe)'
        })
        this.path = path
        this.update = this.update.bind(this)
        node1.on('update', this.update)
        node2.on('update', this.update)
    }
    update() {
        console.log('edge update')
        let offset1 = this.node1.position()
        let center1 = offset1.get('center-center')
        let offset2 = this.node2.position()
        let center2 = offset2.get('center-center')
        let left, right
        if (center1[0] < center2[0]) {
            left = offset1
            right = offset2
        } else {
            left = offset2
            right = offset1
        }
        let lrc = left.get('right-center'),
            rlc = right.get('left-center'),
            distance = right.left - left.right
        let m = lrc.join(' '),
            c1 = [lrc[0] + distance / 2, lrc[1]].join(' '),
            c2 = [rlc[0] - distance / 2, rlc[1]].join(' '),
            c3 = rlc.join(' ')
        const d = `M${m} C ${c1}, ${c2}, ${c3}`
        this.path.setAttribute('d', d)
    }
    render() {
        this.svg.appendChild(this.path)
    }
}
Edge.prototype.svg = document.getElementById('svg')

var area = document.getElementById('area')
area.startX = 0
area.startY = 0
function mousemove(e){
    const top = Math.min(e.clientY, area.startY),
        left = Math.min(e.clientX, area.startX),
        height = Math.abs(e.clientY - area.startY),
        width = Math.abs(e.clientX - area.startX)
    applyStyle(area, {top, left, height, width, display: 'block'})
}
document.addEventListener('click', function(){
    area.style.display = 'none'
    Array.prototype.slice.call(document.querySelectorAll('.node--active')).forEach(dom => {
        dom.classList.remove('node--active')
    })
})
document.addEventListener('mousedown', function(e){
    if(e.button !== 0) return

    area.startX = e.clientX
    area.startY = e.clientY
    document.addEventListener('mousemove', mousemove)
}, false)
document.addEventListener('mouseup', function(){
    area.startX = 0
    area.startY = 0
    document.removeEventListener('mousemove', mousemove)
}, false)

const text = 'hhahahaha'
var n1 = new Node({ text, pos: { left: 300, top: 300 } }),
    n2 = new Node({ text, pos: { left: 500, top: 100 }, parent: n1 }),
    n3 = new Node({ text, pos: { left: 500, top: 200 }, parent: n1 }),
    n4 = new Node({ text, pos: { left: 500, top: 300 }, parent: n1 }),
    n5 = new Node({ text, pos: { left: 500, top: 400 }, parent: n1 })
var ns = [n1, n2, n3, n4, n5]
ns.forEach(n => {
    n.render()
})

var e1 = new Edge(n1,n2),
    e2 = new Edge(n1,n3),
    e3 = new Edge(n1,n4),
    e4 = new Edge(n1,n5)

var es = [e1, e2, e3, e4]
es.forEach(e => {
    e.update()
    e.render()
})
let g = { n: null, c: [{ n: n1, c: [{ n: n2 }, { n: n3 }, { n: n4 }, { n: n5 }] }] }
