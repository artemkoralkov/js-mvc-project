function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      // eslint-disable-next-line no-param-reassign
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}
function save(data, storageItemName) {
  const string = JSON.stringify(data);

  localStorage.setItem(`${storageItemName}`, string);
}

function load(storageItemName) {
  const string = localStorage.getItem(storageItemName);
  const data = JSON.parse(string);

  return data;
}
export { createElement, EventEmitter, save, load };
