class FilmsModel {
  constructor(state = []) {
    this.state = state;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    return item;
  }

  removeItem(id) {
    const index = this.state.filter(item => item.id !== id);

    if (index > -1) {
      this.state.splice(index, 1);
    }
  }
}

export default FilmsModel;
