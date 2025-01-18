window.OPERATOR_NAME = 'VK/FB';
let interval = setInterval(insertCopiedQuoteText, 100);
async function insertCopiedQuoteText() {
    const textarea = document.querySelector('#share_comment, textarea.mentionsTextarea');
    if ( textarea && textarea.dataset.inserted !== 'true') {
        const {copiedQuote, quoteNumber} = await getStorageDataAsync(['copiedQuote', 'quoteNumber']);
        if ( copiedQuote && quoteNumber &&  window.location.href.match(quoteNumber)) {
            textarea.value = copiedQuote;
            textarea.dataset.inserted = 'true';
            simulateEvent(textarea, ['focus', 'keydown', 'keyup', 'input', 'change', 'blur'])
            clearInterval(interval);
        }
    }
}
