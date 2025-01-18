/**
    Reader View - Strips away clutter

    Copyright (C) 2014-2021 [@rNeomy](https://add0n.com/chrome-reader-view.html)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Mozilla Public License as published by
    the Mozilla Foundation, either version 2 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Mozilla Public License for more details.
    You should have received a copy of the Mozilla Public License
    along with this program.  If not, see {https://www.mozilla.org/en-US/MPL/}.

    GitHub: https://github.com/rNeomy/reader-view/
    Homepage: https://add0n.com/chrome-reader-view.html
*/

/* global iframe, args, Behave */

const notes = {};
const key = 'notes:' + args.get('url').split('#')[0];
const BG = [
  '#fff740',
  '#feff9c',
  '#ff65a3',
  '#ff7eb9',
  '#7afcff'
];

const add = (id, {content, style, box}, active = false) => {
  const doc = iframe.contentDocument;

  style = style || {
    color: '#2c2c2d',
    background: BG[Math.floor(BG.length * Math.random())]
  };
  box = box || {
    left: Math.round(400 + (Math.random() - 0.5) * 300),
    top: doc.documentElement.scrollTop + Math.round(400 + (Math.random() - 0.5) * 300),
    width: 300,
    height: 300
  };

  let timeout;
  const save = () => {
    notes[id] = {
      date: Date.now(),
      box,
      style,
      content: textarea.value
    };

    // only save notes with content
    chrome.storage.local.set({
      [key]: Object.entries(notes).filter(([id, o]) => o.content.trim()).reduce((p, [id, o]) => {
        p[id] = o;
        return p;
      }, {})
    });
  };
  const tick = () => {
    if (tick.active) {
      clearTimeout(timeout);
      timeout = setTimeout(save, 200);
    }
    else {
      clearTimeout(timeout);
    }
  };
  tick.active = true;

  const textarea = doc.createElement('textarea');
  textarea.classList.add('note');
  textarea.title = textarea.placeholder = `Instruction:


Delete: Press "ESC" when note is focused
Color: Press "Alt + Number" or "Option + Number"
`;
  textarea.style = `
    color: ${style.color};
    background-color: ${style.background};
    width: ${box.width}px;
    height: ${box.height}px;
    left: ${box.left}px;
    top: ${box.top}px;
  `;
  textarea.value = content;
  textarea.dataset.color = style.background;

  const resizeObserver = new ResizeObserver(() => {
    box.width = Math.max(32, parseInt(getComputedStyle(textarea).width));
    box.height = Math.max(32, parseInt(getComputedStyle(textarea).height));

    tick();
  });
  resizeObserver.observe(textarea);

  textarea.onkeypress = tick;

  textarea.onkeydown = e => {
    if (e.code === 'Escape') {
      e.stopPropagation();
      if (confirm('Permanently remove this note?')) {
        tick.active = false;
        delete notes[id];
        chrome.storage.local.set({
          [key]: notes
        }, () => textarea.remove());
      }
    }
    else if (e.code.startsWith('Digit') && e.altKey) {
      const n = Number(e.code.replace('Digit', ''));
      textarea.dataset.color =
      textarea.style['background-color'] =
      style.background = BG[((n - 1) % BG.length)];
      e.preventDefault();
      tick();
    }
  };

  textarea.onmousedown = e => {
    if ((box.width - e.layerX < 10) && (box.height - e.layerY < 10)) {
      return; // resize
    }

    const move = e => {
      box.left = Math.max(0, box.left + e.movementX);
      box.top = Math.max(0, box.top + e.movementY);
      textarea.style.left = box.left + 'px';
      textarea.style.top = box.top + 'px';
      tick();
    };
    const done = () => {
      doc.removeEventListener('mousemove', move);
      doc.removeEventListener('mouseup', done);
    };

    doc.addEventListener('mousemove', move);
    doc.addEventListener('mouseup', done);
  };

  new Behave({
    textarea
  });

  iframe.contentDocument.body.appendChild(textarea);
  if (active) {
    textarea.focus();
  }
};

const observe = () => {
  const id = Math.random().toString(36).substring(7);
  add(id, {
    content: ''
  }, true);
};

function enable() {
  iframe.addEventListener('load', () => {
    chrome.storage.local.get({
      [key]: {}
    }, prefs => {
      for (const [id, note] of Object.entries(prefs[key])) {
        add(id, note);
      }
    });
  });
  document.addEventListener('add-note', observe);

  const s = document.createElement('script');
  s.src = '/data/reader/plugins/note/behave.js';
  document.body.appendChild(s);
}
function disable() {
  document.removeEventListener('add-note', observe);
}

export {
  enable,
  disable
};
