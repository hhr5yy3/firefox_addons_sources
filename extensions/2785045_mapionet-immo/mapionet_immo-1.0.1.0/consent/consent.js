document.getElementById('accept').addEventListener('click', function(){
    // Step A - We have consent from the user
    step('');
    window.parent.postMessage({ action: 'acknowledge_consent_dialog', state: true }, '*');
});

document.getElementById('reject').addEventListener('click', function(){
    // Step A - No approval from user, show next dialog
    step('B');
});

document.getElementById('bye').addEventListener('click', function(){
    // Step B - No approval at all
    step('');
    window.parent.postMessage({ action: 'acknowledge_consent_dialog', state: false }, '*');
});

document.getElementById('restart').addEventListener('click', function(){
    // Step B - User changed his mind, go back to first dialog
    step('A');
});

function step(c){
    document.getElementById('modalA').style.display = (c == 'A') ? 'block' : 'none';
    document.getElementById('modalB').style.display = (c == 'B') ? 'block' : 'none';
}
