const submitButton = document.querySelector('#submit');
const allowCheckbox = document.querySelector('#allow');
const exitButton = document.querySelector('#exit');

exitButton.onclick = () => browser.tabs.update({ url: '/newtab/index.html' })
submitButton.onclick = async () => {
    if (!allowCheckbox.checked) await browser.storage.sync.remove(['uc']);
    await browser.tabs.update({ url: '/newtab/index.html' });
}