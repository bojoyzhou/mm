import Rect from './Rect'
import { PW, PH } from './constants'

class NodeEvent extends Rect {
    constructor() {
        super()
        this.scaleValue = 1

        this.onClick = this.onClick.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onMousedown = this.onMousedown.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onMouseup = this.onMouseup.bind(this)
        this.onDragdrop = this.onDragdrop.bind(this)
        this.onDrag = this.onDrag.bind(this)
        this.onDragstart = this.onDragstart.bind(this)
        this.onMouseover = this.onMouseover.bind(this)
        this.onMouseleave = this.onMouseleave.bind(this)
        this.on('click', this.onClick)
        this.on('focus', this.onFocus)
        this.on('blur', this.onBlur)
        this.on('mousedown', this.onMousedown)
        this.on('mouseup', this.onMouseup)
        this.on('dragdrop', this.onDragdrop)
        this.on('drag', this.onDrag)
        this.on('dragstart', this.onDragstart)
        this.on('mouseover', this.onMouseover)
        this.on('mouseleave', this.onMouseleave)
        this.on('textchange', this.onTextchange)

        this.on('needrender', () => {
            if (this.parent) {
                this.parent.emit('needrender')
            }
        })

        this.stopChange = false
        this.on('change', () => {
            if (this.parent && !this.stopChange) {
                this.parent.emit('change')
            }
        })

        this.on('scale', (zoomOut) => {
            if(this.isroot){
                if(zoomOut){
                    this.scaleValue -= 0.1
                }else{
                    this.scaleValue += 0.1
                }
                this.emit('scalecontext', this.scaleValue)
            }
        })
    }
    onClick(e) {
        // console.log('Click', e)
    }
    onFocus(e) {
        this.isfocus = true
        this.focus()
    }
    onMousedown(e) {
        // console.log('onMousedown', e)
    }
    onBlur(e) {
        this.blur()
        this.isfocus = false
    }
    onMouseup(e) {
        // console.log('onMouseup', e)
    }
    onDragdrop(e) {
        this.stopChange = false
        let hoverTarget = e.hoverTargets.filter(node => {
            return node !== this
        })[0]
        if (hoverTarget && hoverTarget !== this.parent) {
            this.parent.removeChild(this)
            hoverTarget.addChild(this)

            let { right } = hoverTarget.getRect()
            let { left } = this.getRect()
            this.moveBy(right + PW - left, 0)
        } else if (this.parent && this.beforeDragParent == this.parent && this.beforeDragIndex !== this.index) {
            let firstChild = this.parent.children[0]
            this.parent.children.sort((a, b) => {
                return a.bottom > b.bottom
            })
            if (firstChild) {
                let rect = this.getRect(1),
                    fristRect = firstChild.getRect(1)

                if (rect.top < fristRect.top) {
                    this.moveBy(fristRect.left - rect.left, fristRect.top - rect.top)
                }
            }
            this.parent.ajust()
            this.emit('needrender')
        } else if (!this.isroot && this.beforeDragIndex == this.index && this.beforeDragParent == this.parent) {
            this.moveTo(this.beforeDragLeft, this.beforeDragTop)
            this.emit('needrender')
        }
    }
    onDrag(e) {
        const { left, top } = this.getRect()
        if (e.movementX || e.movementY) {
            this.moveBy(e.movementX, e.movementY)
            this.emit('needrender')
        }
    }
    onDragstart(e) {
        const { left, top } = this.getRect()
        this.beforeDragLeft = left
        this.beforeDragTop = top
        this.beforeDragIndex = this.index
        this.beforeDragParent = this.parent
        this.stopChange = true
    }
    onMouseover(e) {
        document.body.style.cursor = 'pointer'
        this.emit('needrender')
    }
    onMouseleave(e) {
        document.body.style.cursor = 'default'
        this.emit('needrender')
    }
    onTextchange(text) {
        let { height } = this.getRect(1)
        this.setText(text)
        this.textarea.style.width = this.width
        this.emit('change')
        let layout = (() => {
            this.resizeEditElement()
            this.root.removeListener('layout', layout)
        }).bind(this)
        this.root.on('layout', layout)
    }
}
export default NodeEvent
