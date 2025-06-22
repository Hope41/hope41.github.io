const obv_ = new IntersectionObserver(e => {
    for (let i = 0; i < e.length; i ++) {
        const item = e[i]
        if (item.isIntersecting) {
            item.target.style.transitionDelay = item.target.delay + 's'
            item.target.classList.remove('hidden')
        }
        else {
            item.target.style.transitionDelay = '0s'
            item.target.classList.add('hidden')
        }
    }
}, {threshold: 0})

const demos = document.getElementsByClassName('demo-box')

for (let i = 0; i < demos.length; i ++) {
    const item = demos[i]
    item.delay = 0
    obv_.observe(item)
}