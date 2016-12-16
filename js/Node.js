import EventEmitter from 'events'

class Node extends EventEmitter {
    constructor(elem, x, y) {
        super()
        this.elem = elem
        this.status = Node.INITED
        this._status = [Node.INITED]
        this.edges = []
        this.x = x
        this.y = y

        this.ischanged = true
    }
    addEdge(edge) {
        this.edges.push(edge)
    }
    setEdge(edge){
        this.edge = edge
    }
    changeto(status) {
        this.status = status
        this._status.push(status)

        this.elem.contentEditable = false
        this.reset()
        switch(status){
            case Node.EDIT:
                this.elem.classList.add('node--edit')
                this.elem.contentEditable = true
                break
            case Node.ACTIVE:
                this.elem.classList.add('node--active')
                break
        }
    }
    moveto({ x, y }) {
        if (!this.status == Node.ACTIVE) {
            return
        }
        this.x = x
        this.y = y
        this.ischanged = true
        this.emit('update')
    }
    moveBy(x, y) {
        if (!this.status == Node.ACTIVE) {
            return
        }
        this.x += x
        this.y += y
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
    nextPos() {
        let offset = this.getPosition()
        return {
            left: offset.right + 100,
            top: offset.top - 50
        }
    }
    reset(){
        this.elem.classList.remove('node--edit')
        this.elem.classList.remove('node--active')
    }
    render() {
        if (!this.ischanged) {
            return
        }
        this.ischanged = false
        this.elem.style.left = this.x
        this.elem.style.top = this.y
        this.edges.forEach(edge => {
            edge.update()
        })
    }
}
Node.INITED = 'INITED'
Node.ACTIVE = 'ACTIVE'
Node.EDIT = 'EDIT'
Node._ = '_'
export default Node
