(function() {
    let script = document.createElement('script');
    script.textContent = `
        (function() {
            const variableValue = window.groups.map(i => i.selectedRecommendation.bookUrl);

            document.dispatchEvent(new CustomEvent('qqSendInlineVar', { detail: variableValue }));
        })()
    `;
    document.head.appendChild(script);
    script.remove();
})()