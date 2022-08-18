'use strict'
function bar() {
    const topnav = document.querySelector('.topnav')

    if (topnav.className == 'topnav') topnav.className += ' responsive'
    else topnav.className = 'topnav'
}

onload = () => {
    const image = document.querySelectorAll('.image')
    const iframe = document.querySelectorAll('.iframe')
    const code = document.querySelectorAll('.code')
    const year = document.querySelector('.year')
    const load = async text => await (await fetch(text)).text()
    if (year) year.textContent = new Date().getFullYear()

    iframe.forEach(item => {
        const source = item.getAttribute('source')
        const link = item.getAttribute('link')

        const iframe = document.createElement('iframe')
        iframe.src = source

        if (link) {
            iframe.className = 'play'

            const text = document.createElement('div')
            const play = document.createElement('i')
            const a = document.createElement('a')

            a.href = link
            a.target = '_blank'
        
            play.className = 'fa-solid fa-play'
            text.innerHTML = '<span class = italic>Click on the box to go fullscreen</span>'
        
            item.appendChild(text)
            item.appendChild(iframe)
            item.appendChild(play)
            item.appendChild(a)
        }
        else item.appendChild(iframe)
    })

    image.forEach(item => {
        const source = item.getAttribute('source')
        const link = item.getAttribute('link')

        const img = document.createElement('img')
        img.src = source

        if (link) {
            img.className = 'play'

            const text = document.createElement('div')
            const play = document.createElement('i')
            const a = document.createElement('a')

            a.href = link
            a.target = '_blank'

            play.className = 'fa-solid fa-play'
            text.innerHTML = '<span class = italic>Click on the box to go fullscreen</span>'
        
            item.appendChild(text)
            item.appendChild(img)
            item.appendChild(play)
            item.appendChild(a)
        }
        else item.appendChild(img)
    })

    code.forEach(async item => {
        const pre = document.createElement('pre')
        const source = item.getAttribute('source')
        const lang = item.getAttribute('lang')

        pre.innerHTML = hljs.highlight(await load(source), {language: lang}).value

        item.appendChild(pre)
    })
}