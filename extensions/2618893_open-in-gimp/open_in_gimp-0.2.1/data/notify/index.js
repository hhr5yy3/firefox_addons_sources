const args = new URLSearchParams(location.search);

document.getElementById('notify').textContent = args.get('msg') || '...';
