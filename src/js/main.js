'use strict'
const KEY = 'JoachimFordUkColorThemeData'

function syntaxHighlightJavaScriptCode(code) {
    const span = (c, e) => '<span style = "color: var(--' + c + ')">' + e.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'
    const main = code => {
        const data = {
            multi: /`[\s\S]*?`/,
            comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
            string: /".*?"|'.*?'/}
        const total = new RegExp('(' + data.multi.source + '|' + data.string.source + '|' + data.comment.source + ')')

        return code.split(total).map((e, i) => i % 2 ? data.multi.test(e) ? e.split(/(\${.*?})/).map(
            (e, i) => i % 2 ? loop(e) : span('string', e)).join('') :
            data.comment.test(e) ? span('comment', e) : span('string', e) : loop(e)).join('')
    }

    const loop = (code, index = 0) => {
        const list = [
            {class: 'keyword', regex: /\b(arguments|await|case|catch|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|finally|for|function|if|implements|import|in|instanceof|interface|let|new|package|private|protected|public|return|static|switch|throw|try|typeof|var|void|while|with|yield)\b/},
            {class: 'number', regex: /\b(true|false|null|undefined|NaN|Infinity|\d+|\d+e\d+)\b/},
            {class: 'builtin', regex: /\b(eval|isFinite|isNaN|parseFloat|parseInt|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|unescape)\b/},
            {class: 'function', regex: /\b(\w+\()/, item: /\w+/},
            {class: 'variable', regex: /\b(\w+)\b/},
            {class: 'operator', regex: /([\/\\*+<>%=?:\{\}\(\)\-]+)/}
        ]

        return code.split(list[index].regex).map((e, i) => i % 2 ? list[index].item ? e.replace(
            list[index].item, e => span(list[index].class, e)) : span(list[index].class, e) :
            index + 1 == list.length ? e : loop(e, index + 1)).join('')
    }

    return main(code)
}

function toggleTheme() {
    if (document.body.className == 'light')
        document.body.className = 'dark'
    else document.body.className = 'light'

    localStorage.setItem(KEY, document.body.className)
}

function checkForm(data, form) {
    return !data.get('message').length ||
        !form.querySelector('textarea[name=h-captcha-response]').value
}

function pressPost() {
    const form = document.getElementById('form')
    const thanks = document.getElementById('thanks')
    const formData = new FormData(form)
    if (checkForm(formData, form)) return

    form.style = 'opacity: 0'
    thanks.style = 'opacity: 1'
}

window.onload = () => {
    const code = document.getElementsByClassName('code')
    const snip = document.getElementsByClassName('snip')
    const year = document.getElementsByClassName('year')[0]
    const form = document.getElementById('form')
    const divs = document.getElementsByClassName('userCanvas')
    const back = document.getElementById('back')

    if (back) {
        back.onmousedown = () => window.scrollTo(0, 0)
        onscroll = () => {
            if (window.scrollY < window.innerHeight * 2) back.classList.add('invisible')
            else back.classList.remove('invisible')
        }
        onscroll()
    }

    const info = document.getElementById('info')
    const pop = document.getElementById('pop')
    const okay = document.getElementById('okay')
    if (info && pop && okay) {
        info.onmousedown = () => pop.classList.add('open')
        pop.onmousedown = () => pop.classList.remove('open')
        okay.onmousedown = () => pop.classList.remove('open')
    }

    const r = x => {return 100 + Math.random() * 50 * x}
    for (let i = 0; i < divs.length; i ++) {
        divs[i].style.backgroundColor = 'rgb('+r(1)+','+r(1.5)+','+r(2)+')'
    }

    if (form) {
        form.reset()
        form.onsubmit = e => {
            e.preventDefault()

            const formData = new FormData(form)
            if (checkForm(formData, form)) return false
            const object = Object.fromEntries(formData)
            const json = JSON.stringify(object)

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
        }
    }

    if (year) year.textContent = new Date().getFullYear()

    // Get current theme
    if (localStorage.getItem(KEY) == 'light') toggleTheme()

    // Highlight code
    for (let i = 0; i < code.length; i ++) {
        const box = code[i]
        const text = box.textContent.split(/^#(.*)/gm)

        let content = ''
        for (let j = 0; j < text.length; j ++) {
            const line = text[j]
            if (j % 2) content += '<span class = c>'+syntaxHighlightJavaScriptCode(line)+'</span>'
            else content += syntaxHighlightJavaScriptCode(line)
        }

        box.innerHTML = content
    }

    for (let i = 0; i < snip.length; i ++) {
        const box = snip[i]
        box.innerHTML = syntaxHighlightJavaScriptCode(box.textContent)
    }
}
