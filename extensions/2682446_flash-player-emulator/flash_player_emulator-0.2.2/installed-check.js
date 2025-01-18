// Allow our website to detect extension
var detectionScript = document.createElement('script');
detectionScript.innerHTML = 'window.__modernkit_flash_emulator_installed = true;';
document.documentElement.appendChild(detectionScript);