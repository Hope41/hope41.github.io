oncontextmenu = e => e.preventDefault()

onload = () => {
	let code = document.getElementsByTagName('pre')

	for (let item of code) {
		item.innerHTML = item.innerHTML

		.replace(/\/\/.+/g, a => '<span class=note>' + a + '</span>')
		.replace(/&lt;!--([\s\S]*?)--&gt;/g, a => '<span class=note>' + a + '</span>')
		.replace(/("|'|`).+("|'|`)/g, a => '<span class=string>' + a + '</span>')
		.replace(/if|else|let|var|const|function/g, a => '<span class=key>' + a + '</span>')
	}
}