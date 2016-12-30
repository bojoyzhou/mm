import randomColor from './RandomColor'
import NodeEvent from './NodeEvent'

class Node extends NodeEvent {
    static ctx = null;
    static setCtx() {
        let canvas = document.createElement('canvas')
        canvas.width = document.body.offsetWidth
        canvas.height = document.body.offsetHeight
        Node.ctx = canvas.getContext('2d')
        Node.ctx.fillStyle = "rgba(0, 0, 0, .75)"
        Node.ctx.textAlign = "left"
        Node.ctx.textBaseline = "bottom"
    }
    constructor(text) {
        super()
        if (!Node.ctx) {
            Node.setCtx()
        }
        this.size = 10
        this.padding = 8
        this.fontSize = 14
        this.lineHeight = 20

        this.setText(text)
        this.children = []
        this.textarea = this.initEditElement()
        this.bindEditElementEvent()

        this.level = 0
        this.isroot = true
        this.parent = null
        this.root = this
    }
    initEditElement() {
        let textarea = document.createElement('textarea')
        document.body.appendChild(textarea)
        return textarea
    }
    resizeEditElement() {
        const { left, top, width, height } = this.getRect(1)
        this.textarea.style = `left: ${left + 5};top: ${top - 2};width: ${width + 7};height: ${height + 2};display: block;`
    }
    bindEditElementEvent() {
        this.textarea.addEventListener('input', (e) => {
            this.emit('textchange', this.textarea.value)
        })
        this.textarea.addEventListener('blur', (e) => {
            this.emit('blur')
        })
    }
    setFontSize(fontSize) {
        this.fontSize = fontSize
        this.setSize()
    }
    setText(text) {
        text = text || ''
        this.text = text.split('\n')
        this.setSize()
    }
    setSize() {
        this.setHeight(this.text.length * this.lineHeight || this.lineHeight)
        this.setWidth(Math.max.apply(Math, this.text.map((t, idx) => {
            Node.ctx.font = `600 ${this.fontSize}px Arial`
            return Node.ctx.measureText(t).width + this.padding * 2
        })) || 1)
    }
    prev() {
        return this.parent && this.parent.children[this.index - 1]
    }
    next() {
        return this.parent && this.parent.children[this.index + 1]
    }
    ajust() {
        this.children.forEach((child, idx) => {
            if (child.index !== idx) {
                child.index = idx
            }
            child.index = idx
            child.root = this.root
            child.parent = this
            child.isroot = false
            child.level = this.level + 1
            child.size = Math.max(this.size - 1, 2)
            if (!this.isroot) {
                child.color = this.color
            }
            child.ajust()
        })
        this.emit('change')
    }
    removeChild(node) {
        this.children = this.children.filter(n => (n !== node))
        this.ajust()
    }
    addChild(child, i) {
        const clen = this.children.length
        i = arguments.length == 1 ? clen : i + 1
        this.children.splice(i, 0, child)
        if (this.isroot) {
            child.color = randomColor()
        } else {
            child.color = this.color
        }
        this.ajust()
    }
    addNode(text) {
        let n = new Node(text)
        this.addChild(n)
        return n
    }
    moveTo(left, top) {
        let x = left - this.left,
            y = top - this.top
        this.moveBy(x, y)
        return { x, y }
    }
    moveBy(x, y) {
        this.children.forEach(child => {
            child.moveBy(x, y)
        })
        this.set({
            left: this.left + x,
            top: this.top + y
        })
    }
    focus() {
        const { left, top, width, height } = this.getRect()
        this.resizeEditElement()
        this.textarea.style.display = 'block'
        this.textarea.value = this.text.join('\n')
        this.textarea.focus()
    }
    blur() {
        this.textarea.style.display = 'none'
        this.emit('change')
    }
}
export default Node
