'use strict'
const profiles = document.getElementsByClassName('profile-image')
const mouse = {x: innerWidth / 2, y: innerHeight / 2}

for (let i = 0; i < profiles.length; i ++) {
    const item = profiles[i]
    const parent = item.parentElement
    const img = item.firstElementChild

    const resetTransform = () => {
        item.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)'
    }

    const moveImage = () => {
        const rect = parent.getBoundingClientRect()

        const x = mouse.x - rect.left
        const y = mouse.y - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const strength = 100
        const fades = 7

        let rotateX = (y - centerY) / centerY
        let rotateY = (x - centerX) / centerX

        const xOft = rotateY
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

        const distance = Math.hypot(rotateX, rotateY)
        const damping = 1 / (1 + distance * fades)

        rotateX *= damping
        rotateY *= damping

        item.style.transform =
            'perspective(500px) rotateX('+(rotateX*-strength)+'deg) rotateY('+(rotateY*strength)+'deg)'
    }

    let reset = false
    addEventListener('mousemove', e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        moveImage()
    })

    parent.onmouseleave = () => resetTransform()
}