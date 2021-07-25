oncontextmenu = e => e.preventDefault()

onload = () => {
	let code = document.getElementsByTagName('pre')

	for (let item of code) {
		item.innerHTML = item.innerHTML
		.replace(/\/\/.+\n/g, a => '<span class=note>' + a + '</span>')
		.replace(/("|'|`).+("|'|`)/g, a => '<span class=string>' + a + '</span>')
	}
}