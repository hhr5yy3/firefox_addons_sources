import { createElement } from './dom-chef.js';

const CheckIcon = (props) => (
  createElement('svg', {
    className: "octicon octicon-check" ,
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16"   ,
    role: "img",
    'aria-hidden': "true",
    ...props,}

    , createElement('path', { d: "M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"                          ,} )
  )
);

export { CheckIcon as default };
