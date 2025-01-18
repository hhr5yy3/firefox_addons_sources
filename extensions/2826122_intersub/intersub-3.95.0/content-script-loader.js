(function () {
  const intersubInitializationIntervalId = setInterval(() => {
    if (document.body?.appendChild) {
      clearInterval(intersubInitializationIntervalId);
      const wrapper = document.createElement('div');
      wrapper.classList.add('intersub-subtitle-bar');
      wrapper.classList.add('intersub-subtitle-bar-wrapper-plugin');
      wrapper.style.display = 'none';
      const shadowRoot = wrapper.attachShadow({ mode: 'open' });
      const subtitleBarEl = document.createElement('intersub-subtitle-bar');
      shadowRoot.appendChild(subtitleBarEl);

      // We have to add an element to the DOM: otherwise,
      // WebComponent's constructor won't be called
      document.body.appendChild(wrapper);
    }
  }, 1000);
})();
