globalThis.chrome = globalThis.browser;

const CONTENT_TYPE = 'application/pdf';
const pdf = {
    contentType: `${CONTENT_TYPE};base64`,
    aliases: [
        CONTENT_TYPE,
        '.pdf',
        'pdf',
    ],
    body: 'JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFI+PmVuZG9iagp0cmFpbGVyIDw8L1Jvb3QgMSAwIFI+Pg==',
};

export { CONTENT_TYPE, pdf as default };
