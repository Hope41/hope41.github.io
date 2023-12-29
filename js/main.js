'use strict'
function bar() {
    const topnav = document.querySelector('.topnav')
    if (topnav.className == 'topnav') topnav.className += ' responsive'
    else topnav.className = 'topnav'
}

onload = () => {
    const iframe = document.querySelectorAll('.iframe')
    const code = document.querySelectorAll('.code')
    const year = document.querySelector('.year')

    const load = async text => await (await fetch(text)).text()
    if (year) year.textContent = new Date().getFullYear()

    iframe.forEach(item => {
        const source = item.getAttribute('source')
        const iframe = document.createElement('iframe')
        iframe.src = source

        item.appendChild(iframe)
    })

    code.forEach(async item => {
        const pre = document.createElement('pre')
        const source = item.getAttribute('source')
        const code = (source ? await load(source) : item.textContent).split('¬')
        item.textContent = ''

        let state = 'hash'
        for (let i = 0; i < code.length; i ++) {
            if (state) {
                pre.innerHTML += code[i]
                    .replace(/</g, '&lt;')
                    .replace(/(\/\/.*)/g,'<span class = string>$1</span>')
            }
            else pre.innerHTML += '<span class = hash>' + code[i] + '</span>'

            if (state) state = ''
            else state = 'hash'
        }

        item.appendChild(pre)
    })
}