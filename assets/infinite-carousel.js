'use strict'
const slideHolders = document.getElementsByClassName('infinite-carousel-holder')
const slideSpeed = 1.5
const cssGap = 25

for (let i = 0; i < slideHolders.length; i ++)
    slideHolders[i].xOffset = 0

function animateSliders(perf) {
    const dt = Math.min(1, (performance.now() - perf) / 16)

    // Go through all the sliders
    for (let i = 0; i < slideHolders.length; i ++) {
        const holder = slideHolders[i]
        holder.xOffset -= dt * slideSpeed

        if (holder.xOffset < -holder.scrollWidth / 2 - cssGap / 2)
            holder.xOffset = 0

        holder.style.transform = 'translateX(' + holder.xOffset + 'px)'
    }

    const old = performance.now()
    requestAnimationFrame(() => animateSliders(old))
}

animateSliders(0)