document.addEventListener('DOMContentLoaded', () => {
    const buttonObserver = new MutationObserver(() => {
        setupButtonListeners();
    });

    buttonObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    setupButtonListeners();
});

function setupButtonListeners() {
    const buttons = document.querySelectorAll('.btn-plus, .btn-minus');
    buttons.forEach(button => {
        if (!button.hasListener) {
            button.hasListener = true;
            button.addEventListener('mouseover', () => {
                window.parent.postMessage({
                    type: 'BUTTON_HOVER',
                    action: button.classList.contains('btn-plus') ? 'increase' : 'decrease',
                    label: button.getAttribute('aria-label')
                }, '*');
            });
        }
    });
}
