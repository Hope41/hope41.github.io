'use strict'
const codeHolders = document.getElementsByClassName('code-holder')

addEventListener('load', () => {
    for (let i = 0; i < codeHolders.length; i ++) {
        const holder = codeHolders[i]
        const code = holder.getElementsByClassName('code')[0]
        const copyButton = holder.getElementsByClassName('code-copy')[0]
        const img = copyButton.firstElementChild

        copyButton.addEventListener('click', () => {
            img.src = '/assets/check.svg'
            setTimeout(() => img.src = '/assets/copy.svg', 1000)
            if (!navigator.clipboard) return
            navigator.clipboard.writeText(code.innerText)
        })
    }
})