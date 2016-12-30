import EventEmitter from 'events'

class Rect extends EventEmitter {
    constructor() {
        super()
        this.left = 0
        this.top = 0
        this.right = 1
        this.bottom = 20
        this.width = 1
        this.height = 20

        this.changeTime = Date.now()
        this.cache = {  }
    }
    getRect(f) {
        let { left, top, right, bottom, width, height } = this
        // return { left, top, right, bottom, width, height }
        let t = f ? 1 : (Date.now() - this.changeTime) / 300
        if (t >= 1) {
            return { left, top, right, bottom, width, height }
        }

        function current(now, last) {
            if (now == last || last === undefined) {
                return now
            }
            return last + (now - last) * t
        }

        let { c_left, c_top, c_right, c_bottom, c_width, c_height } = this.cache
        let ret =  {
            left: current(left, c_left),
            top: current(top, c_top),
            right: current(right, c_right),
            bottom: current(bottom, c_bottom),
            width: current(width, c_width),
            height: current(height, c_height)
        }
        return ret
    }
    setLeft(v) {
        let right = this.right
        right += v - this.left
        this.right = right
        let left = v
        this._set({ left, right })
    }
    setTop(v) {
        let bottom = this.bottom
        bottom += v - this.top
        this.bottom = bottom
        let top = v
        this._set({ bottom, top })
    }
    setWidth(v) {
        let right = this.right
        right += v - this.width
        this.right = right
        let width = v
        this._set({ right, width })
    }
    setHeight(v) {
        let bottom = this.bottom
        bottom += v - this.height
        this.bottom = bottom
        let height = v
        this._set({ bottom, height })
    }
    _set(param) {
        for (let i in param) {
            this[i] = param[i]
        }
    }
    set(param) {
        let ischange = false
        for (let i in param) {
            if (this[i] !== param[i]) {
                ischange = true
            }
        }

        if (ischange) {
            let props = ['left', 'top', 'right', 'bottom', 'width', 'height']
            props.forEach(p => {
                this.cache['c_' + p] = this[p]
            })
            for (let i in param) {
                this[`set${i[0].toUpperCase() + i.slice(1)}`](param[i])
            }
            this.changeTime = Date.now()
            this.emit('change')
        }
    }
}
export default Rect
