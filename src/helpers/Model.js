import { saveToStorage } from './helpers';

class Model {
  constructor(storageKeyName, state = []) {
    this.storageKeyName = storageKeyName;
    this.state = state;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    saveToStorage(this.state, this.storageKeyName);
    return item;
  }

  removeItem(id) {
    this.state = this.state.filter(item => item.id !== +id);
    saveToStorage(this.state, this.storageKeyName);
  }
}

export default Model;
