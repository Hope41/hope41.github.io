'use strict'
const profiles = document.getElementsByClassName('profile-image')
const mouse = {x: innerWidth / 2, y: innerHeight / 2}

for (let i = 0; i < profiles.length; i ++) {
    const item = profiles[i]
    const parent = item.parentElement
    const img = item.firstElementChild

    const resetTransform = () => {
        item.style.transform = 'translate(0,0)'
    }

    const moveImage = () => {
        const rect = parent.getBoundingClientRect()

        const x = mouse.x - rect.left
        const y = mouse.y - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const strength = 100
        const fades = 20

        let dx = (x - centerX) / centerX
        let dy = (y - centerY) / centerY

        const xOft = dx
        if (xOft < -.6) {
            img.src = '/assets/logo-white-left.png'
            reset = false
        }
        else if (xOft > .6) {
            img.src = '/assets/logo-white-right.png'
            reset = false
        }
        else if (!reset) {
            reset = true
            setTimeout(() => {
                if (!reset) return
                img.src = '/assets/logo-white.png'
                reset = false
            }, 100)
        }

        const distance = Math.hypot(dx, dy)
        const damping = 1 / (1 + distance * fades)

        dx *= damping
        dy *= damping

        item.style.transform = 'translate('+(dx*strength)+'px, '+(dy*strength)+'px)'
    }

    let reset = false
    addEventListener('mousemove', e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        moveImage()
    })

    parent.onmouseleave = () => resetTransform()
}