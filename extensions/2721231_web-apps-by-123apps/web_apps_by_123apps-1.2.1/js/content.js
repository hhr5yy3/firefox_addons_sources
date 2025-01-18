var allowed_domains = [
    "123apps.com",
    "dev.123apps.com",
    "mp3cut.net",
    "audio-joiner.com",
    "online-audio-converter.com",
    "video-converter.com",
    "online-video-cutter.com",
    "webcamera.io",
    "online-voice-recorder.com",
    "audio-extractor.net",
    "extract.me",
    "pdf.io",
    "convert.io"
];

if (allowed_domains.indexOf(window.location.host) != -1) {
    var body = document.querySelector('body');
    body.dataset.allappsExtInstalled = "1";
}



