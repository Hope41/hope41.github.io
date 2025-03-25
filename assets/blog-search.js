'use strict'
const search = document.getElementsByClassName('search-input')[0]
const gallery = document.getElementsByClassName('demo-gallery')[0]
const filterButton = document.getElementsByClassName('search-filter')[0]
const filterBox = document.getElementsByClassName('search-filter-box')[0]
const boxes = document.getElementsByClassName('demo-box')
const searchTags = document.getElementsByClassName('search-tag')
const posts = []

function simplify(str) {
    return str.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
}

function hasCommonTag(post, specialStr) {
    const words = post.tags.split(' ')
    const specialWords = specialStr.split(' ')

    // Iterate through selected tags
    for (let i = 0; i < specialWords.length; i ++) {
        const tag = specialWords[i]
        if (!tag) continue

        // Read time
        const reading = (tag == 'five-to-ten' || tag == 'twenty' || tag == 'thirty')
        if (reading) {
            if (tag == 'five-to-ten' && post.read <= 19) return true
            if (tag == 'twenty' && post.read >= 20 && post.read <= 29) return true
            if (tag == 'thirty' && post.read >= 30) return true
            if (i >= specialWords.length - 2) return false
            continue
        }

        // Tag
        if (!words.includes(tag)) return false
    }
    return true
}

filterButton.onclick = () => {
    filterBox.classList.toggle('open')
}

for (let i = 0; i < boxes.length; i ++) {
    const item = boxes[i]
    const title = item.getElementsByTagName('h2')[0].textContent
    const tags = item.dataset.tags
    const clock = item.getElementsByClassName('clock')[0]
    const read = Number(clock.textContent.match(/\d+/).join(''))
    const text = item.getElementsByClassName('demo-body-text')[0].textContent

    posts.push({item, title, text, tags, read})
}

let tagStr = ''
function generateTagStr() {
    tagStr = ''
    for (let i = 0; i < searchTags.length; i ++) {
        if (searchTags[i].classList.contains('selected'))
            tagStr += searchTags[i].id + ' '
    }
}

generateTagStr()

for (let i = 0; i < searchTags.length; i ++) {
    const tag = searchTags[i]
    tag.onclick = () => {
        tag.classList.toggle('selected')
        generateTagStr()
        changeFilterInput()
    }
}

function changeFilterInput() {
    const queryWords = search.value.split(' ')
    const arr = []

    // Iterate through stored posts
    for (let i = 0; i < posts.length; i ++) {
        const dic = {post: posts[i], score: 0, idx: i}
        const content = simplify(posts[i].title + posts[i].text)

        // Iterate through words of searched query
        for (let j = 0; j < queryWords.length; j ++) {
            const word = simplify(queryWords[j])
            if (content.includes(word)) dic.score += word.length * 2

            // If the word doesn't match, find a match inside the word
            else {
                for (let k = 0; k < word.length; k ++) {
                    const wordSoFar = word.slice(0, k)
                    if (content.includes(wordSoFar)) dic.score ++
                }
            }
        }

        arr.push(dic)
    }

    let hasContent = false
    gallery.innerHTML = ''

    // Sort the array based on the score in ascending order
    arr.sort((a, b) => b.score - a.score)
    for (let i = 0; i < arr.length; i ++) {
        const post = arr[i].post
        if (!tagStr || hasCommonTag(post, tagStr)) {
            post.item.style.display = 'flex'
            hasContent = true
        }
        else post.item.style.display = 'none'

        if (tagStr) gallery.appendChild(post.item)
        else gallery.insertBefore(post.item, post.idx)
    }

    if (!hasContent) {
        gallery.innerHTML = 'No results found!'
    }
}

search.oninput = () => changeFilterInput()
search.onchange = () => changeFilterInput()