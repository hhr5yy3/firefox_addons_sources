function openTab(tabId) {
    const tabButton = document.querySelector(`button.tabButton[data-pane="${tabId}"]`);
    if (tabButton) {
        tabButton.click();

        const allTabButtons = document.querySelectorAll('button.tabButton');
        allTabButtons.forEach(btn => {
            if (btn === tabButton) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const allTabPanes = document.querySelectorAll('.tabPane');
        allTabPanes.forEach(pane => {
            if (pane.getAttribute('id') === tabId) {
                pane.classList.add('active'); 
            } else {
                pane.classList.remove('active'); 
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const logoImages = {
        settings: 'img/footer/settings.svg', 
        filters: 'img/footer/filters.svg',
        disabled: 'img/footer/disabled.svg',
    };

    function changeLogoImage(src) {
        const logoImgElement = document.querySelector('.logo img');
        if (logoImgElement) {
            logoImgElement.src = src;
        }
    }

    const tabButtons = document.querySelectorAll('.tabButton');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pane = this.getAttribute('data-pane');
            changeLogoImage(logoImages[pane]);
            window.location.hash = pane;
        });
    });

    function setInitialLogo() {
        const activePane = document.body.getAttribute('data-pane');
        changeLogoImage(logoImages[activePane] || logoImages.settings); 
    }

    setInitialLogo();
});
