new Clipboard('#btn-copy', {
				text: trigger => copyItems()
		}).on('success', function (e) {
		e
				.trigger
				.classList
				.toggle('tooltiped')
		setTimeout(function () {
				e
						.trigger
						.classList
						.toggle('tooltiped')
		}, 1000)
})
