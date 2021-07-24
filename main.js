oncontextmenu = e => e.preventDefault()

onload = () => {
    let iframes = Object.values(document.getElementsByTagName('iframe'))

    iframes.forEach((iframe, index) => {
		let content = iframe.contentWindow || iframe.contentDocument
		content.document.open()
		content.document.write('<body style="margin:0;overflow:hidden"><canvas id=c></canvas><script>' + source[index] + '</script></body>')
		content.document.close()
	})
}