var mouseisdown = false,
    flatNodes = [],
    hoverTargets = [],
    rootNode = null,
    scaleValue = 1

function proxyEvent(node) {
    let t = null
    node.on('change', () => {
        if (t) {
            clearTimeout(t)
        }
        t = setTimeout(() => {
            flatNodes = flat(node)
        }, 300)
    })
    node.on('scalecontext', (value) => {
        scaleValue = value
    })
    node.on('resetscale', () => {
        scaleValue = 1
    })
    rootNode = node
}

function fixScale(param){
    for(let i in param){
        param[i] *= scaleValue
    }
    return param
}

function splitTarget(x, y) {
    var notTarget = [],
        targets = flatNodes.filter(child => {
            const { left, top, right, bottom } = fixScale(child.getRect())
            let ret = left < x && x < right && top < y && y < bottom
            if (!ret) {
                notTarget.push(child)
            }
            return ret
        })
    return { targets, notTarget }
}

function flat(node) {
    let ns = [node]
    node.children.map(child => {
        ns = ns.concat(flat(child))
    })
    return ns
}

function addEvent(type, func) {
    function filter(e) {
        if (!rootNode) {
            return prevent(e)
        }
        func.apply(this, arguments)
    }
    document.body.addEventListener(type, filter, false)
    return () => {
        document.body.removeEventListener(type, filter)
    }
}

let errorX = 0, errorY = 0
function wrap(e) {
    let { clientX, clientY, movementX, movementY } = e
    let we = fixScale({ movementX, movementY })
    movementX = Math.floor(we.movementX + errorX)
    movementY = Math.floor(we.movementY + errorY)
    errorX = we.movementX - movementX
    errorY = we.movementY - movementY
    we.movementX = movementX
    we.movementY = movementY
    we.clientX = clientX
    we.clientY = clientY
    we.hoverTargets = hoverTargets
    return we
}

function prevent(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}
addEvent('click', e => {
    e = wrap(e)
    const { targets, notTarget } = splitTarget(e.clientX, e.clientY)
    targets.forEach(child => {
        child.emit('click', e)
    })
    notTarget.forEach(child => {
        child.isfocus && child.emit('blur', e)
        child.isfocus = false
    })
})
addEvent('dblclick', e => {
    e = wrap(e)
    const { targets, notTarget } = splitTarget(e.clientX, e.clientY)
    targets.forEach(child => {
        child.isfocus || child.emit('focus', e)
        child.isfocus = true
    })
    notTarget.forEach(child => {
        child.isfocus && child.emit('blur', e)
        child.isfocus = false
    })
})
addEvent('mousedown', e => {
    e = wrap(e)
    mouseisdown = true
    const { targets, notTarget } = splitTarget(e.clientX, e.clientY)
    targets.forEach(child => {
        child.emit('mousedown', e)
        child.mouseisdown = true
    })
    notTarget.forEach(child => {
        child.isfocus && child.emit('blur', e)
        child.isfocus = false
    })
})
addEvent('mouseup', e => {
    e = wrap(e)
    mouseisdown = false
    document.body.style.cursor = 'default'
    const { targets, notTarget } = splitTarget(e.clientX, e.clientY)
    targets.forEach(child => {
        child.emit('mouseup', e)
        child.mouseisdown = false
        if (child.isdragstart) {
            child.emit('dragdrop', e)
            child.isdragstart = false
        }
    })
    notTarget.forEach(child => {
        child.mouseisdown = false
        if (child.isdragstart) {
            child.emit('dragdrop', e)
            child.isdragstart = false
        }
    })
})
addEvent('mousemove', e => {
    e = wrap(e)
    const { targets, notTarget } = splitTarget(e.clientX, e.clientY)
    if (mouseisdown) {
        document.body.style.cursor = 'pointer'
        let dragFlag = false
        targets.forEach(child => {
            if (child.isdragstart) {
                child.emit('drag', e)
                dragFlag = true
            } else if (child.mouseisdown) {
                child.emit('dragstart', e)
                child.isdragstart = true
                dragFlag = true
            }
        })
        notTarget.forEach(child => {
            if (child.isdragstart) {
                child.emit('drag', e)
                dragFlag = true
            }
        })
        if (!dragFlag && targets.length == 0) {
            rootNode.moveBy(e.movementX, e.movementY)
        }
    }
    targets.forEach(child => {
        child.ismouseover || child.emit('mouseover', e)
        child.ismouseover = true
    })
    notTarget.forEach(child => {
        child.ismouseover && child.emit('mouseleave', e)
        child.ismouseover = false
    })
    hoverTargets = targets
})
addEvent('wheel', e => {
    rootNode.emit('scale', e.deltaY > 0)
})
export default proxyEvent
