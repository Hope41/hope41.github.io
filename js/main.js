'use strict'
const KEY = 'JoachimFordUkColorThemeData'

function toggleTheme() {
    if (document.body.className == 'light')
        document.body.className = 'dark'
    else document.body.className = 'light'

    localStorage.setItem(KEY, document.body.className)
}

window.onload = () => {
    const code = document.querySelectorAll('.code')
    const year = document.querySelector('.year')
    if (year) year.textContent = new Date().getFullYear()

    // Get current theme
    if (localStorage.getItem(KEY) == 'light') toggleTheme()

    // Highlight code
    for (let i = 0; i < code.length; i ++) {
        const box = code[i]
        const lines = box.textContent.split('¬')
        let isGrayed = false

        for (let i = 0; i < lines.length; i ++) {
            if (isGrayed) lines[i] = '<span class = gray>' + lines[i] + '</span>'
            else {
                lines[i] = lines[i]
                    .replace(/</g, '&lt;')
                    .replace(/(\/\/.*)/g, '<span class = comment>$1</span>')
                    .replace(/(\'.*\')/g, '<span class = string>$1</span>')
                    .replace(/(\b\d+\b|\.)/g, '<span class = number>$1</span>')
                    .replace(/(function)(.*)(\()/g, 'function<span class="name">$2</span>(')

                lines[i] = lines[i]
                    .replace(/\b(if|else|return|function|const|let|for|in|of|break|continue)\b/g, '<span class = keyword>$1</span>')
            }

            isGrayed = !isGrayed
        }
        box.innerHTML = lines.join('')
    }
}
