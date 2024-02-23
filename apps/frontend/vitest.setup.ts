import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: "http://localhost",
});
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

// Extend the global environment with window and document properties from jsdom
global.window = window;
global.document = window.document;
copyProps(window, global);

// Use Object.defineProperty to safely redefine the navigator property
Object.defineProperty(global, 'navigator', {
  value: {
    userAgent: 'node.js',
  },
  writable: true, // Allow future modifications if necessary
});

// Mock document.createElement to include style and other necessary properties
document.createElement = ((originalCreateElement) => {
  return function (tagName, options) {
    const element = originalCreateElement.call(document, tagName, options);

    if (!element.style) {
      element.style = {};
    }

    // Define CSSOM properties like 'WebkitAnimation' on the style object if necessary
    Object.assign(element.style, {
      WebkitAnimation: '',
    });

    return element;
  };
})(document.createElement);

