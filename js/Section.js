import EventEmitter from 'events'

function applyStyle(element, style) {
    for (let i in style) {
        element.style[i] = style[i]
    }
}

class Section extends EventEmitter {
    constructor() {
        super()
        this.left = -1
        this.top = -1
        this.width = 0
        this.height = 0
        var elem = document.createElement('div')
        elem.classList.add('area')

        document.body.appendChild(elem)

        this.ischanged = true
        this.elem = elem
    }
    changeto({ left, top, width, height }) {
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.ischanged = true
    }
    getPosition() {
        let offset = this.elem.getBoundingClientRect()
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
    contains(node) {
        const { left, top, right, bottom } = node.getPosition()
        const { s_left, s_top, s_right, s_bottom } = this.getPosition()
        if (s_left < left && s_right > right && s_top < top && s_bottom > bottom) {
            return true
        }
        return false
    }
    show(){
        this.display = 'block'
        this.ischanged = true
    }
    hide(){
        this.display = 'none'
        this.ischanged = true
    }
    render() {
        if (!this.ischanged) {
            return
        }
        this.ischanged = false
        let { left, top, width, height, display } = this
        applyStyle(this.elem, { left, top, width, height, display })
    }
}

export default Section
