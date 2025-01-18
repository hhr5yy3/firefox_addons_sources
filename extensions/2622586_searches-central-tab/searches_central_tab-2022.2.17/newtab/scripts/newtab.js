const hasClass = (element, className) => {
    while(element) {
        if (element.classList && element.classList.contains(className)) return true;
        element = element.parentNode;
    }
    return false;
}

const state = new Proxy({ date: new Date() }, {
    set(target, prop, value) {
        target[prop] = value;
        if (prop === 'date')
            document.querySelector('main #content .datetime').textContent = target.date.toLocaleDateString('en-US', { weekday:'long', month: 'long', day:'numeric' }) + ' - ' + target.date.toLocaleTimeString('en-US', { hour:'numeric', minute: 'numeric' });

        return true;
    }
});

state.date = new Date();
setInterval(() => state.date = new Date(), 1000);

window.onclick = evt => {
    if (hasClass(evt.target, 'no-click')) return;
    document.querySelector('main input[name=p]').focus();
};

document.querySelector('main form').onsubmit = () => setTimeout(() => document.querySelector('main input[name=p]').value = '', 500);