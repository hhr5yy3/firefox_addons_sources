if (typeof window.turnstileCallback === 'function') {
    window.turnstileCallback(document.querySelector('.twocaptcha-turnstile-helper input').value);
}