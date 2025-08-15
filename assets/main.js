'use strict'
const year = document.getElementById('year')
const colorTheme = document.getElementById('color-theme')
const savedTheme = localStorage.getItem('joachimford-color-theme')
const tooltipAreas = document.querySelectorAll('[data-tip]')
const urlParams = new URLSearchParams(window.location.search)
const PC = !('ontouchstart' in document.createElement('div'))
year.textContent = new Date().getFullYear()

const tooltip = document.createElement('div')
tooltip.classList.add('tooltip')

// COLOR THEME
let lightThemeEnabled = savedTheme == 'light'

function setColorTheme(forceLight = undefined) {
    const isLight = document.body.classList.toggle('light', forceLight)
    document.body.classList.toggle('dark', !forceLight)
    if (isLight) localStorage.setItem('joachimford-color-theme', 'light')
    else localStorage.removeItem('joachimford-color-theme')
    lightThemeEnabled = isLight
}

if (urlParams.get('light') != undefined)
    setColorTheme(true)

else if (urlParams.get('dark') != undefined)
    setColorTheme(false)

else {
    if (lightThemeEnabled) {
        document.body.classList.add('light')
        document.body.classList.remove('dark')
    }
    else {
        document.body.classList.add('dark')
        document.body.classList.remove('light')
    }
}

colorTheme.onclick = () => setColorTheme()

for (let i = 0; i < tooltipAreas.length; i ++) {
    const item = tooltipAreas[i]

    let over = false
    item.onmouseover = () => {
        over = true
        setTimeout(() => {
            if (!over) return
            over = false

            const box = item.getBoundingClientRect()
            tooltip.textContent = item.dataset.tip
            tooltip.style.top = (box.y - 3) + 'px'
            tooltip.style.left = (box.x + box.width / 2) + 'px'
            tooltip.classList.add('show')
        }, 200)
    }

    item.onmouseleave = () => {
        over = false
        tooltip.classList.remove('show')
    }
}

document.body.appendChild(tooltip)

// TEXTAREA
const textarea = document.getElementsByTagName('textarea')
for (let i = 0; i < textarea.length; i ++) {
    const item = textarea[i]
    const count = document.createElement('div')
    const max = (Number(item.dataset.limit) || 3000)

    item.value = ''
    item.oninput = () => {
        if (item.value.length >= max) {
            item.value = item.value.slice(0, max)
            count.classList.add('reached-max')
        }
        else count.classList.remove('reached-max')

        item.style.height = ''
        item.style.height = (item.scrollHeight + 3) + 'px'

        count.textContent = item.value.length + '/' + max
    }
    item.oninput()

    count.className = 'comment-count'
    item.parentElement.insertBefore(count, item.nextElementSibling)
}

// SURVEY
const survey = document.getElementById('survey')
if (survey) {
    const surveyClose = document.getElementById('survey-close')
    surveyClose.onclick = () => document.body.classList.remove('survey-open')
    setTimeout(() => document.body.classList.add('survey-open'), 200)
}

// TOPNAV
const topnav = document.getElementsByClassName('topnav-menu')[0]
const navBars = document.getElementById('nav-bars')
if (navBars && navBars.style.display != 'none') {
    addEventListener('resize', () => topnav.classList.remove('open'))
    navBars.onclick = () => {
        topnav.classList.toggle('open')
    }
}

// CHECKBOXES
const checkbox = document.getElementsByClassName('checkbox')
for (let i = 0; i < checkbox.length; i ++) {
    const item = checkbox[i]
    item.onchange = () => item.parentElement.classList.toggle('checked', item.checked)

    if (item.dataset.checked != undefined) item.checked = true
    else item.checked = false

    item.onchange()
}

// SUBMIT FORM
const allForms = document.getElementsByTagName('form')

function sendComment(form, event) {
    event.preventDefault()

    const inputs = form.getElementsByTagName('input')
    const textarea = form.getElementsByTagName('textarea')
    const button = form.getElementsByTagName('button')[0]
    const notify = document.getElementById('notify')

    const get = (ipt, str) => {
        return (ipt ? ipt[str] : 'Unknown')
    }

    let data = {
        url: (form.dataset.url || location.href),
        input1: get(inputs[0],'value'),
        input2: get(inputs[1],'value'),
        input3: get(inputs[2],'value'),
        input4: get(inputs[3],'value'),
        message1: get(textarea[0],'value'),
        message2: get(textarea[1],'value'),
        notify: get(notify,'checked'),
        subscribed: (button.classList.contains('subscribe') ? 'Yes' : 'No')
    }

    fetch('https://script.google.com/macros/s/AKfycbwmLCOjsKHDRkhGNE91w1ganjnWbsbjijhxUKEJHbn8lXxFyTvOqJMG6dHiljPlPQgl6Q/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {})
    .catch(error => {})

    form.classList.add('submitted')
}

for (let i = 0; i < allForms.length; i++) {
    allForms[i].onsubmit = e => sendComment(allForms[i], e)
}