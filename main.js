window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-F1R0H0BSJE');

oncontextmenu = e => e.preventDefault()

onload = () => {
	let code = document.getElementsByTagName('pre')

	for (item of code) {
		item.innerHTML = item.innerHTML
		.replace(/\/\/.+\n/g, a => '<span class=note>' + a + '</span>')
		.replace(/("|'|`).+("|'|`)/g, a => '<span class=string>' + a + '</span>')
	}
}