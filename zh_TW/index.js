function bodyClick() {
    document.getElementById('WelcomeMask').style.display = 'none'
    document.body.removeEventListener("click", bodyClick)
}
function load() {
    document.body.addEventListener("click", bodyClick)
}
function windowMove(e) {
    var obj = e.target
    var x = parseInt(obj.getAttribute('lastX'))
    var px = obj.getAttribute('lastpX')
    x += e.pageX - parseInt(px)
    obj.parentElement.style.left = x.toString() + 'px'
    var y = parseInt(obj.getAttribute('lastY'))
    var py = obj.getAttribute('lastpY')
    y += e.pageY - parseInt(py)
    obj.parentElement.style.top = y.toString() + 'px'
    obj.setAttribute('lastpX', e.pageX)
    obj.setAttribute('lastX', x)
    obj.setAttribute('lastY', y)
    obj.setAttribute('lastpY', e.pageY)
}
function windowDown(e){
    if(e.target.parentElement.getAttribute('windowstate') == 'normal'){
        e.target.setAttribute('lastX', e.target.parentElement.offsetLeft)
        e.target.setAttribute('lastpX', e.pageX)
        e.target.setAttribute('lastY', e.target.parentElement.offsetTop)
        e.target.setAttribute('lastpY', e.pageY)
        e.target.addEventListener('mousemove', windowMove)
    }
}
function windowUp(e){
    if(e.target.parentElement.getAttribute('windowstate') == 'normal'){
        e.target.removeEventListener('mousemove', windowMove)
    }
}
function maxTransEnd(e) {
    var obj = e.target
    obj.style.transition = 'none'
    obj.removeEventListener('transitionend', maxTransEnd)
}
function windowMax(e) {
    var obj = e.target.parentElement
    if(obj.getAttribute('windowstate') == 'normal'){
        obj.style.transition = 'all ease 0.5s'
        obj.addEventListener('transitionend', maxTransEnd)
        obj.setAttribute('laststate', JSON.stringify({
            top: obj.offsetTop,
            left: obj.offsetLeft,
            width: obj.offsetWidth,
            height: obj.offsetHeight,
            state: 'normal'
        }))
        obj.style.top = '0'
        obj.style.left = '0'
        obj.style.width = '100%'
        obj.style.height = '100%'
        e.target.className = 'fa fa-compress'
        obj.setAttribute('windowstate', 'maximal')
    }else{
        obj.style.transition = 'all ease 0.5s'
        obj.addEventListener('transitionend', maxTransEnd)
        e.target.className = 'fa fa-expand'
        var old = JSON.parse(obj.getAttribute('laststate'))
        obj.style.top = old.top + 'px'
        obj.style.left = old.left + 'px'
        obj.style.width = old.width + 'px'
        obj.style.height = old.height + 'px'
        obj.setAttribute('windowstate', 'normal')
    }
}
function minTransEnd(e) {
    var obj = e.target
    obj.style.transition = 'none'
    obj.style.display = 'none'
    obj.style.opacity = '1'
    obj.removeEventListener('transitionend', minTransEnd)
}
function windowMin(e) {
    var obj = e.target.parentElement
    obj.style.transition = 'all ease 0.3s'
    obj.addEventListener('transitionend', minTransEnd)
    if(obj.getAttribute('windowstate') == 'normal'){
        obj.setAttribute('laststate', JSON.stringify({
            top: obj.offsetTop,
            left: obj.offsetLeft,
            width: obj.offsetWidth,
            height: obj.offsetHeight,
            state: 'normal'
        }))
    }else{
        var old = JSON.parse(obj.getAttribute('laststate'))
        old.state = 'maximal'
        obj.setAttribute('laststate', JSON.stringify(old))
    }
    var ori = document.getElementById(obj.getAttribute('windoworient'))
    obj.style.top = ori.offsetTop
    obj.style.left = '0'
    obj.style.opacity = '0'
    obj.style.width = '1.5em'
    obj.style.height = '1.5em'
    obj.setAttribute('windowstate', 'minimal')
}
function windowClose(e) {
    var obj = e.target.parentElement
    obj.parentElement.removeChild(obj)
}
function navClick(id, title, link) {
    var existWin = document.getElementById(id + 'Window')
    if (existWin) {
        if(existWin.getAttribute('windowstate') == 'minimal'){
            existWin.style.transition = 'all ease 0.5s'
            existWin.style.display = 'block'
            existWin.addEventListener('transitionend', maxTransEnd)
            var old = JSON.parse(existWin.getAttribute('laststate'))
            if(old.state == 'normal'){
                existWin.style.top = old.top + 'px'
                existWin.style.left = old.left + 'px'
                existWin.style.width = old.width + 'px'
                existWin.style.height = old.height + 'px'
                existWin.setAttribute('windowstate', 'normal')
            }else{
                existWin.style.top = '0'
                existWin.style.left = '0'
                existWin.style.width = '100%'
                existWin.style.height = '100%'
                existWin.setAttribute('windowstate', 'maximal')
            }
        }
    }else{
        var windowObj = document.createElement('DIV')
        windowObj.className = 'pagewindow'
        windowObj.setAttribute('windowstate', 'normal')
        windowObj.setAttribute('windoworient', id)
        windowObj.id = id + 'Window'
        var b = document.createElement('B')
        b.addEventListener('mousedown',windowDown)
        b.addEventListener('mouseup',windowUp)
        b.addEventListener('mouseleave',windowUp)
        b.innerHTML = title
        windowObj.appendChild(b)
        var i = document.createElement('I')
        i.className = 'fa fa-close'
        i.addEventListener('click',windowClose)
        windowObj.appendChild(i)
        i = document.createElement('I')
        i.className = 'fa fa-expand'
        i.addEventListener('click',windowMax)
        windowObj.appendChild(i)
        i = document.createElement('I')
        i.className = 'fa fa-minus'
        i.addEventListener('click',windowMin)
        windowObj.appendChild(i)
        var frame = document.createElement('IFRAME')
        frame.src = link
        windowObj.appendChild(frame)
        document.body.lastElementChild.appendChild(windowObj)
    }
}
