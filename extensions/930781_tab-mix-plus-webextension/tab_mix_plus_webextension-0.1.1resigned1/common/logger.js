/* globals module */
/* exported log, debug */
'use strict';

const logging = false;
const debugging = false;

function getName(index = 0) {
  let msg = 'Tabmix:';
  const stack = Error().stack.split('\n').slice(2);
  const caller = stack[index];
  if (caller) {
    const data = caller.split('/');
    msg += ` (${data[0].split('@')[0]} ${data[data.length - 1]})`;
  }
  return `${msg}\n`;
}

function log(...msg) {
  if (logging) {
    console.log(getName(), ...msg);
  }
}

function debug(...msg) {
  if (debugging) {
    console.log(getName(), ...msg);
  }
}

if (typeof module == 'object' && typeof module.exports == 'object') {
  module.exports = {
    log,
    debug,
  };
}
