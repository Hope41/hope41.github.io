'use strict'
const texts = document.getElementsByClassName('cool-text')
const obv = new IntersectionObserver(e => {
    for (let i = 0; i < e.length; i ++) {
        const item = e[i]
        if (item.isIntersecting) {
            for (let j = 0; j < item.target.children.length; j ++) {
                const div = item.target.children[j]
                for (let k = 0; k < div.children.length; k ++) {
                    const span = div.children[k]
                    span.style.transitionDelay = span.delay
                    span.classList.remove('hidden')
                }
            }
        }
        else {
            for (let j = 0; j < item.target.children.length; j ++) {
                const div = item.target.children[j]
                for (let k = 0; k < div.children.length; k ++) {
                    const span = div.children[k]
                    span.style.transitionDelay = '0s'
                    span.classList.add('hidden')
                }
            }
        }
    }
}, {threshold: 0})

for (let i = 0; i < texts.length; i ++) {
    const text = texts[i]
    const content = text.textContent.replace(/\s+/g,' ').trim()
    const words = content.split(' ')

    text.textContent = ''

    for (let j = 0; j < words.length; j ++) {
        const word = words[j]
        const chars = word.split('')
        const div = document.createElement('div')

        for (let k = 0; k < chars.length; k ++) {
            const char = chars[k]
            const span = document.createElement('span')
            const seed = 12
            const delay = (1 + Math.sin(seed+k*seed+i*seed+j*seed+k*i*j*seed)) * .1

            span.delay = delay+'s'
            span.style.transitionDelay = delay+'s'
            span.classList.add('hidden')
            span.textContent = char

            div.appendChild(span)
        }

        text.appendChild(div)
    }

    obv.observe(text)
}