oncontextmenu = e => e.preventDefault()

onload = () => {
	let code = document.getElementsByTagName('pre')

	for (let item of code) {
		item.innerHTML = item.innerHTML

		// if there are notes
		.replace(/\/\/.+/g, a => '<span class=note>' + a + '</span>')

		 // if there are strings
		.replace(/("|'|`).+("|'|`)/g, a => '<span class=string>' + a + '</span>')

		.replace(/let|var|const|function/g, a => '<span class=key>' + a + '</span>')
	}
}