const store = id => chrome.storage.local.set({
  'player': id
}, top.location.reload());

document.addEventListener('click', e => {
  const id = e.target.id;

  if (['cat', 'dog', '', 'dinosaur', 'kangaroo'].includes(id)) {
    store(id);
  }
});

document.addEventListener('keyup', e => {
  e.stopPropagation();

  if (['1', '2', '3', '4'].includes(e.key)) {
    const n = document.querySelector('.item:nth-of-type(' + e.key + ') input');
    if (n) {
      store(n.id);
    }
  }
});
