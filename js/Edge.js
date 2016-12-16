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

        this.update()
        this.svg.appendChild(this.path)
    }
    update() {
        let offset1 = this.node1.getPosition()
        let center1 = offset1.get('center-center')
        let offset2 = this.node2.getPosition()
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
}
Edge.prototype.svg = document.getElementById('svg')

export default function (selector){
    Edge.prototype.svg = document.querySelector(selector)
    return Edge
}
