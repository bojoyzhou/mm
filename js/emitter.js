function emitter(ee) {
    let isMouseDown = false,
        startX = 0,
        startY = 0,
        dragTarget = null
    document.body.addEventListener('dblclick', function(e) {
        const target = e.target
        if (target.classList.contains('node')) {
            ee.emit('editNode', {
                target,
                e
            })
        }else{
            ee.emit('createNode', {
                left: e.clientX,
                top: e.clientY
            })
        }
    }, false)
    document.body.addEventListener('mousedown', function(e) {
        //不是左键，忽略
        if (e.button !== 0) return
        isMouseDown = true
        startX = e.clientX
        startY = e.clientY
        const target = e.target
        if (target.classList.contains('node')) {
            ee.emit('activeNode', {
                target,
                e
            })
            dragTarget = target
        }else{
            ee.emit('startSelection', {
                e
            })
        }
    }, false)
    document.body.addEventListener('mousemove', function(e) {
        //鼠标不是按下状态，忽略
        if (!isMouseDown) return
        if (dragTarget) {
            ee.emit('moveNode', {
                target: dragTarget,
                e
            })
        }else{
            ee.emit('dragSelection', {
                e,
                startX,
                startY
            })
        }
    }, false)
    document.body.addEventListener('mouseup', function(e) {
        if(!dragTarget){
            ee.emit('endSelection', {
                e
            })
        }
        cancel('mouseup')
    }, false)
    document.addEventListener('mouseout', function(e) {
        if (e.target == document) {
            cancel('mouseout')
        }
    }, false)
    document.body.addEventListener('click', function(e) {
        if (!e.target.classList.contains('node')){
            ee.emit('reset')
        }
    }, false)
    document.body.addEventListener('keydown', function(e) {
        if (!e.target.classList.contains('node')) return
        switch (e.code) {
            case 'Tab':
                ee.emit('createNode', { e, target: e.target })
                break
        }
    }, false)


    function cancel(type) {
        isMouseDown = false
        startX = 0
        startY = 0
        dragTarget = null
    }

    function start() {
        ee.emit('render')
        requestAnimationFrame(start)
    }
    requestAnimationFrame(start)
}
export default emitter
