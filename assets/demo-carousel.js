'use strict'
const carousels = document.getElementsByClassName('demo-carousel-hold')

for (let i = 0; i < carousels.length; i ++) {
    const item = carousels[i]
    const left = item.getElementsByClassName('demo-carousel-left')[0]
    const right = item.getElementsByClassName('demo-carousel-right')[0]
    const sequence = item.getElementsByClassName('demo-carousel-images')[0]
    const tempImg = item.getElementsByClassName('demo-carousel-img')[0]

    let tempImgWidth = 0
    let amtOnScreen = 0

    sequence.pos = 0

    const setTransform = () => {
        if (sequence.children.length < amtOnScreen) {
            left.classList.add('hide')
            right.classList.add('hide')
            return
        }

        left.classList.remove('hide')
        right.classList.remove('hide')

        if (sequence.pos >= 0) {
            sequence.pos = 0
            left.classList.add('hide')
        }

        if (sequence.pos <= -sequence.children.length + amtOnScreen) {
            sequence.pos = -sequence.children.length + amtOnScreen
            right.classList.add('hide')
        }

        sequence.style.transform = 'translateX('+(sequence.pos*tempImgWidth)+'px)'
    }

    const reCalcWidth = () => {
        tempImgWidth = tempImg.getBoundingClientRect().width

        amtOnScreen = 4
        if (innerWidth < 820) amtOnScreen = 3
        if (innerWidth < 630) amtOnScreen = 2

        setTransform()
    }

    addEventListener('resize', reCalcWidth)
    reCalcWidth()

    if (PC) {
        left.onmousedown = () => {
            sequence.pos ++
            setTransform()
        }
        right.onmousedown = () => {
            sequence.pos --
            setTransform()
        }
    }

    else {
        left.ontouchstart = () => {
            sequence.pos ++
            setTransform()
        }
        right.ontouchstart = () => {
            sequence.pos --
            setTransform()
        }
    }
}