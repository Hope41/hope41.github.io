'use strict'
const heroBg = document.getElementsByClassName('hero-background')[0]
const heroHolder = document.getElementById('hero')
const heroText = document.getElementById('hero-text')
const heroSmallLines = document.getElementsByClassName('hero-small-line')
const heroSubText = document.getElementById('hero-sub-text')

// Calculate sub text appearing
function showSubText() {
    if (!heroSubText) return
    const oldTransition = heroSubText.style.transition
    heroSubText.style.transition = 'none'
    heroSubText.classList.add('hidden')

    setTimeout(() => {
        heroSubText.style.transition = oldTransition
        heroSubText.classList.remove('hidden')
    }, 16)
}
showSubText()

// Calculate small lines appearing
for (let i = 0; i < heroSmallLines.length; i ++) {
    const item = heroSmallLines[i]
    const oldTransition = item.style.transition
    item.style.transition = 'none'
    item.classList.add('hidden')

    setTimeout(() => {
        item.style.transition = oldTransition
        item.classList.remove('hidden')
    }, 16)
}

// Calculate hero text
if (heroText) {
    for (let j = 0; j < heroText.children.length; j ++) {
        const div = heroText.children[j]

        for (let i = 0; i < div.children.length; i ++) {
            const item = div.children[i]

            const oldTransform = item.style.transform
            const oldTransition = item.style.transition
            const startY = 180
            const startAngle = Math.sin(i*i*i*44-99) * 100

            item.style.transition = 'none'
            item.style.transform = 'translateY(-'+startY+'px) rotate('+startAngle+'deg)'
            item.classList.add('hidden')

            setTimeout(() => {
                item.style.transform = oldTransform
                item.style.transition = oldTransition
                item.style.transitionDelay = .1 + (j / 2 + i * .07) + 's'
                item.classList.remove('hidden')
            }, 16)
        }
    }
}

function updateHero() {
    const y = scrollY/innerHeight

    if (heroBg) {
        if (heroHolder)
            heroHolder.style.transform = 'translateY('+scrollY/2+'px)'

        heroBg.style.transform = 'translateY('+scrollY/2+'px)'
        heroBg.style.opacity = 1-y/2
    }

    else if (heroHolder) {
        heroHolder.style.transform = 'translateY('+scrollY/2+'px) scale('+(1-y/2)+')'
        heroHolder.style.opacity = 1-y*2
    }

    requestAnimationFrame(() => updateHero())
}
updateHero()