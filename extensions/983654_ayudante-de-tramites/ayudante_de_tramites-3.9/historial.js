function loadHistory() {
    return localStorage.history ? JSON.parse(localStorage.history) : []
}
function setHistoryMaxSize(a) {
    localStorage.max_size = a
}
function getHistoryMaxSize() {
    return localStorage.max_size ? localStorage.max_size : 6
}
function saveHistory(a) {
    localStorage.history = JSON.stringify(a)
}
function removeHistory(a) {
    var b = loadHistory();
    a < b.length && (b.splice(a, 1), saveHistory(b))
}
function truncHistory() {
    var a = loadHistory();
    for (getHistoryMaxSize(); a.length > getHistoryMaxSize();) a.pop();
    saveHistory(a)
}
function addHistory(a) {
    var b = loadHistory();
    b.unshift(a);
    for (getHistoryMaxSize(); b.length > getHistoryMaxSize();) b.pop();
    saveHistory(b)
}
function cleanHistory() {
    saveHistory([])
};