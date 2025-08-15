'use strict'
const popups = document.getElementsByClassName('popup')
const popupLinks = document.getElementsByClassName('popup-link')
const popupCloses = document.getElementsByClassName('popup-close')

for (let i = 0; i < popupLinks.length; i ++) {
    const item = popupLinks[i]
    item.onclick = () => {
        const elem = document.getElementById(item.dataset.id)
        if (!elem) return
        elem.classList.add('open')
    }
}

for (let i = 0; i < popupCloses.length; i ++) {
    const item = popupCloses[i]
    item.onclick = () => {
        const elem = document.getElementById(item.dataset.id)
        if (!elem) return
        elem.classList.remove('open')
    }
}

for (let i = 0; i < popups.length; i ++) {
    const item = popups[i]
    item.onclick = (e) => {
        if (e.target == item)
            item.classList.remove('open')
    }
}