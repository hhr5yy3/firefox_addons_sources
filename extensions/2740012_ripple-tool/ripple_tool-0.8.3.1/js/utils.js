const SLEEP_COMMAND = "zzzripple";


/**
 * Appends the given HTML string to the end
 * of the body tag
 **/
export const appendHtml = (htmlString) => {
  const contentEl = document.createElement("div");
  contentEl.innerHTML = htmlString;

  document.body.appendChild(contentEl);
}

/**
 * Injects a script tag into the main page DOM to
 * load the given source file
 **/
export const injectCode = (src) => {
    const script = document.createElement('script');

    script.src = src;
    script.onload = function() {
      this.remove();
    };

    nullthrows(document.head || document.documentElement).appendChild(script);
}

/**
 * Returns whether or not the search term provided
 * is requesting the ripple extension be put into
 * sleep mode
 **/
export const isSleepCommand = (searchTerms) => SLEEP_COMMAND === searchTerms[0];

const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");

  return v;
}

export const setBreathingCounter = count => {
  const counterEl = document.querySelector("span.breath_count");
  counterEl.innerHTML = count;
};

export const setBreathingText = text => {
  const counterEl = document.querySelector("h4.breath_text");
  counterEl.innerHTML = text;
}
