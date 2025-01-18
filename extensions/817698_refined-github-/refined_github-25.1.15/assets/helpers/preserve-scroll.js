function preserveScroll(
	anchor = document.elementFromPoint(innerWidth / 2, innerHeight / 2),
) {
	const originalPosition = anchor.getBoundingClientRect().top;

	/**
	Resets the previously-saved scroll
	*/
	return () => {
		requestAnimationFrame(() => {
			const newPosition = anchor.getBoundingClientRect().top;
			window.scrollBy(0, newPosition - originalPosition);
		});
	};
}

export { preserveScroll as default };
