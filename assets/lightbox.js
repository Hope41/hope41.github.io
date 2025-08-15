'use strict'
const imagesToView = document.getElementsByClassName('view-image')
const lightboxOverlay = document.getElementById('lightbox-overlay')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxCopy = document.getElementById('lightbox-copy')
const lightboxDownload = document.getElementById('lightbox-download')
const lightboxClose = document.getElementById('lightbox-close')
const lightboxPrev = document.getElementById('lightbox-prev')
const lightboxNext = document.getElementById('lightbox-next')
const html = document.getElementById('html')
const cursor = {x: 0, y: 0}

const lightboxTransitionSeconds = .2
const lightBoxStr = lightboxTransitionSeconds + 's'
const lightboxTransition = `opacity ${lightBoxStr}, padding ${lightBoxStr}`

const shouldNotHaveArrows = () => {
    return (selected ? selected.parentElement.children.length < 2 : false)
}

lightboxImg.scale = 1
lightboxImg.oft = {x: 0, y: 0}
lightboxImg.transform = () => {
    lightboxImg.style.transform = 'translate('+
        lightboxImg.oft.x+'px,calc(var(--lightbox-topnav-height) / 2 + '+
        lightboxImg.oft.y+'px)) scale('+lightboxImg.scale+')'
}
lightboxImg.restrict = () => {
    const img = lightboxImg.getBoundingClientRect()

    const num = Math.max(2, 2 / (lightboxImg.scale - 1))
    const x = img.width / num
    const y = img.height / num

    if (lightboxImg.oft.x < -x) lightboxImg.oft.x = -x
    if (lightboxImg.oft.x > x) lightboxImg.oft.x = x
    if (lightboxImg.oft.y < -y) lightboxImg.oft.y = -y
    if (lightboxImg.oft.y > y) lightboxImg.oft.y = y
}

lightboxOverlay.resetAll = () => {
    lightboxImg.oft.x = 0
    lightboxImg.oft.y = 0
    lightboxImg.scale = 1
    lightboxImg.transform()

    cursor.x = 0
    cursor.y = 0

    lightboxPrev.classList.remove('hide')
    lightboxNext.classList.remove('hide')
}

lightboxOverlay.mouseInImg = e => {
    const img = lightboxImg.getBoundingClientRect()
    const touch = e.touches || e.changedTouches

    const mouseInImg = (
        e.clientX > img.x && e.clientX < img.x + img.width &&
        e.clientY > img.y && e.clientY < img.y + img.height)

    if (mouseInImg) return true
    if (!touch) return false

    const x = touch[0].pageX
    const y = touch[0].pageY

    const touchInImg = (
        x > img.x && x < img.x + img.width &&
        y > img.y && y < img.y + img.height)

    return touchInImg
}

lightboxOverlay.ondblclick = e => {
    if (lightboxOverlay.mouseInImg(e))
        lightboxOverlay.resetAll()
}

lightboxOverlay.addEventListener('mousemove', e => {
    document.body.style.cursor = 'auto'

    if (!cursor.x && !cursor.y) {
        cursor.x = e.clientX
        cursor.y = e.clientY
    }

    if (lightboxOverlay.mouseInImg(e)) {
        document.body.style.cursor = 'grab'
        if (e.buttons >= 1) {
            document.body.style.cursor = 'grabbing'

            lightboxImg.oft.x += (e.clientX - cursor.x)
            lightboxImg.oft.y += (e.clientY - cursor.y)

            lightboxImg.restrict()
            lightboxImg.transform()
        }
    }

    cursor.x = e.clientX
    cursor.y = e.clientY
})

let mouseOnImage = false
lightboxOverlay.addEventListener('mousedown', e => {
    if (lightboxOverlay.mouseInImg(e)) {
        mouseOnImage = true
        if (e.buttons >= 1) document.body.style.cursor = 'grabbing'
    }
})

lightboxOverlay.addEventListener('mouseup', e => {
    document.body.style.cursor = 'auto'
    mouseOnImage = false

    if (lightboxOverlay.mouseInImg(e))
        document.body.style.cursor = 'grab'
})

lightboxOverlay.oldDist = 0

lightboxOverlay.close = (e = 0, force = false) => {
    // Don't close
    if (!force && e) {
        if (lightboxOverlay.mouseInImg(e)) return
        if (e.target != lightboxOverlay) return
    }

    lightboxOverlay.classList.remove('open')
    html.classList.remove('no-scroll')

    lightboxOverlay.resetAll()
}

lightboxOverlay.oncontextmenu = e => e.preventDefault()

lightboxOverlay.openImage = img => {
    lightboxOverlay.resetAll()
    html.classList.add('no-scroll')

    if (img.src == lightboxImg.src || !lightboxOverlay.classList.contains('open'))
        lightboxImg.style.transition = '0s'

    lightboxOverlay.classList.add('open')
    lightboxImg.classList.add('faded')

    setTimeout(() => {
        lightboxImg.style.transition = lightboxTransition
        lightboxImg.classList.remove('faded')
        lightboxImg.src = img.src
    }, lightboxTransitionSeconds * 1000)
}

lightboxOverlay.calcZoom = amt => {
    const multiply = .004
    const scale = amt * lightboxImg.scale * multiply

    lightboxPrev.classList.remove('hide')
    lightboxNext.classList.remove('hide')

    if (lightboxImg.scale > 1.15 || shouldNotHaveArrows()) {
        lightboxPrev.classList.add('hide')
        lightboxNext.classList.add('hide')
    }

    if (lightboxImg.scale - scale > 1 && lightboxImg.scale - scale < 10) {
        lightboxImg.scale = lightboxImg.scale - scale
        lightboxImg.oft.x -= lightboxImg.oft.x * amt * multiply
        lightboxImg.oft.y -= lightboxImg.oft.y * amt * multiply
    }

    lightboxImg.restrict()
    lightboxImg.transform()
}

lightboxOverlay.addEventListener('wheel', e => {
    lightboxOverlay.calcZoom(e.deltaY)
    e.preventDefault()
},{passive: false})

// Only close window when tap away on PC
lightboxOverlay.onmousedown = e => lightboxOverlay.close(e)

lightboxOverlay.zoom = false
if (!PC) {
    lightboxOverlay.ontouchstart = e => {
        if (e.touches.length == 2)
            lightboxOverlay.zoom = true
    }

    lightboxOverlay.ontouchmove = e => {
        const touch = e.touches || e.changedTouches

        if (!cursor.x && !cursor.y) {
            cursor.x = touch[0].pageX
            cursor.y = touch[0].pageY
        }

        lightboxImg.oft.x += (touch[0].pageX - cursor.x)
        lightboxImg.oft.y += (touch[0].pageY - cursor.y)

        lightboxImg.restrict()
        lightboxImg.transform()

        cursor.x = touch[0].pageX
        cursor.y = touch[0].pageY

        if (lightboxOverlay.zoom) {
            const dist = Math.hypot(
                touch[0].pageX - touch[1].pageX,
                touch[0].pageY - touch[1].pageY)

            if (!lightboxOverlay.oldDist) lightboxOverlay.oldDist = dist
            lightboxOverlay.calcZoom(lightboxOverlay.oldDist - dist)
            lightboxOverlay.oldDist = dist
        }
    }

    lightboxOverlay.ontouchend = e => {
        cursor.x = 0
        cursor.y = 0

        if (lightboxOverlay.zoom) {
            lightboxOverlay.zoom = false
            lightboxOverlay.oldDist = 0
        }
    }
}

lightboxCopy.onclick = () => {
    const imageUrl = lightboxImg.src

    navigator.clipboard.writeText(imageUrl)
        .then(() => {
            lightboxCopy.firstElementChild.src = '/assets/check.svg'
            setTimeout(() => lightboxCopy.firstElementChild.src = '/assets/copy.svg', 1000)
        })
        .catch(err => {console.error('Failed to copy URL: ', err)})
}

lightboxDownload.onclick = () => {
    const link = document.createElement('a')
    link.href = lightboxImg.src
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
lightboxClose.onclick = () => lightboxOverlay.close(0, true)

// LOAD IMAGES
let selected = 0
for (let i = 0; i < imagesToView.length; i ++) {
    const item = imagesToView[i]
    item.onclick = () => {
        lightboxOverlay.openImage(item.firstElementChild)
        selected = item

        if (shouldNotHaveArrows()) {
            lightboxPrev.classList.add('hide')
            lightboxNext.classList.add('hide')
        }
    }
}

lightboxPrev.onclick = () => {
    if (!selected || selected.parentElement.children.length < 2) return

    selected = (selected.previousElementSibling || selected.parentElement.lastElementChild || selected)
    lightboxOverlay.openImage(selected.firstElementChild)
}

lightboxNext.onclick = () => {
    if (!selected || selected.parentElement.children.length < 2) return

    selected = (selected.nextElementSibling || selected.parentElement.firstElementChild || selected)
    lightboxOverlay.openImage(selected.firstElementChild)
}