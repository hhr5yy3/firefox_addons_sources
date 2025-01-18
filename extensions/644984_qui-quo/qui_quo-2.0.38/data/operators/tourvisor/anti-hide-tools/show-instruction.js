function createInstruction() {
    if ( document.querySelector('.tv.instruction') || localStorage.getItem('hideInstruction') === 'true' ) {
       return;
    }
    let wrapper = document.createElement('div');
    wrapper.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
        z-index: 999999;
    `
    wrapper.classList.add('tv', 'instruction', 'qq');
    const shadowRoot = wrapper.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
<style>
    .qq-brand span {
        color: #A02300;
        font-weight: bold;

    }

    .floating-container {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #f0f0f0;
        border-top-left-radius: 8px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .text-link {
        margin-right: 10px;
        font-size: 14px;
    }

    .close-icon {
        cursor: pointer;
        padding: 5px;
        position: absolute;
        right: 5px;
        top: 5px;
    }
</style>
<div class="floating-container">
    <div style="flex-direction: column;">
    <div style="font-weight: bold;text-align: center"> Важная информация от <span style="color:red;">Q</span>ui-<span style="color:red;">Q</span>uo 
        <span class="close-icon" onclick="this.closest('.floating-container').remove()">✖️</span>
    
    </div>
    <div>
        <p>К сожалению, компания Турвизор активно борется с нашим расширением и блокирует его функционал на своём сайте.
            Чтобы продолжить пользоваться всеми возможностями нашего сервиса, пожалуйста, ознакомьтесь с инструкцией по
            обходу этих ограничений.
        </p>

        <button class="brand qq-brand"
           onclick="window.open('https://help.qui-quo.support/ru-RU/support/solutions/articles/35000259264-что-делать-если-на-турвизоре-пропали-галочки-')">
            Перейти на страницу с инструкцией</button>
         <button id="hide-instruction">Больше не показывать</button>
    </div>
    <div>

 
</div>
    
    </div>

</div>
    `;

    document.body.append(wrapper);
    shadowRoot.getElementById('hide-instruction')?.addEventListener('click', hideInstruction);
    function hideInstruction() {
        document.querySelector('.tv.instruction')?.remove();
        localStorage.setItem('hideInstruction', 'true');
    }
}
