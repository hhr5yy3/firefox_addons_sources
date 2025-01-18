/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-var */
/* eslint-disable no-undef */
try {
  // eslint-disable-next-line vars-on-top
  var window = self;
  importScripts('vendors/bundle.js', 'bg/bundle.js');
} catch (e) {
  console.log(e);
}
// import * from './vendors/bundle.js';
// import * from './bg/bundle.js';
