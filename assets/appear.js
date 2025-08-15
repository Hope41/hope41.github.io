const obv_ = new IntersectionObserver(e => {
    for (let i = 0; i < e.length; i ++) {
        const item = e[i]
        const target = item.target

        if (item.isIntersecting) {
            target.style.transitionDelay = target.delay
            target.classList.remove('hidden')
        }
        else {
            target.style.transitionDelay = '0s'
            target.classList.add('hidden')
        }
    }
}, {threshold: 0})

const coolThings = document.getElementsByClassName('cool-thing')

for (let i = 0; i < coolThings.length; i ++) {
    const item = coolThings[i]

    item.classList.add('hidden')
    item.delay = (item.target.delay || 0) + 's'
    obv_.observe(item)
}