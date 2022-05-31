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

        pre.innerHTML = hljs.highlight(await load(source), {
            language: source.split('.').pop()}).value

        item.appendChild(pre)
    })

    // const script = document.querySelectorAll('script[type = text]')
    // const pre_code = document.querySelectorAll('pre.code')
    // const div_iframe = document.querySelectorAll('div.iframe')
    // const div_image = document.querySelectorAll('div.image')
    // const year = document.querySelector('span.year')
    // if (year != null) year.textContent = new Date().getFullYear()

    // for (let i = 0; i < pre_code.length; i ++) {
    //     const elem = pre_code[i]
    //     const code = script[elem.id].textContent.replace(/&sol;/g, '/')

    //     elem.innerHTML = hljs.highlight(code, {language: script[elem.id].id}).value
    // }

    // // SEE https://www.w3schools.com/Jsref/met_htmlcollection_item.asp

    // for (let i = 0; i < div_iframe.length; i ++) {
    //     const elem = div_iframe[i]
    //     const link = elem.textContent
    //     elem.textContent = ''

    //     if (link.length) {
    //         const a = document.createElement('a')
    //         const play = document.createElement('i')
    //         const iframe = document.createElement('iframe')
    //         const text = document.createElement('div')
        
    //         a.href = link
    //         a.target = '_blank'
        
    //         play.className = 'fa-solid fa-play'
    //         iframe.srcdoc = script[elem.id].innerHTML.replace(/&sol;/g, '/')
    //         iframe.className = 'play'

    //         text.innerHTML = '<span class = italic>Click on the box to go fullscreen</span>'
        
    //         elem.appendChild(text)
    //         elem.appendChild(iframe)
    //         elem.appendChild(play)
    //         elem.appendChild(a)
    //     }

    //     else {
    //         const iframe = document.createElement('iframe')
    //         iframe.srcdoc = script[elem.id].innerHTML.replace(/&sol;/g, '/')

    //         elem.appendChild(iframe)
    //     }
    // }

    // for (let i = 0; i < div_image.length; i ++) {
    //     const elem = div_image[i]
    //     const path = elem.id
    //     const link = elem.textContent
    //     elem.textContent = ''

    //     if (link.length) {
    //         const a = document.createElement('a')
    //         const play = document.createElement('i')
    //         const img = document.createElement('img')
    //         const text = document.createElement('div')
        
    //         a.href = link
    //         a.target = '_blank'
        
    //         play.className = 'fa-solid fa-play'
    //         img.src = path

    //         text.innerHTML = '<span class = italic>Click on the box to start</span>'
        
    //         elem.appendChild(text)
    //         elem.appendChild(img)
    //         elem.appendChild(play)
    //         elem.appendChild(a)
    //     }

    //     else {
    //         const iframe = document.createElement('iframe')
    //         iframe.srcdoc = '<img src = ' + path + '>'

    //         elem.appendChild(iframe)
    //     }
    // }
}