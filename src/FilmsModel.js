class FilmsModel {
  constructor(state = []) {
    this.state = state;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    localStorage.setItem('state', JSON.stringify(this.state));
    return item;
  }

  removeItem(id) {
    localStorage.setItem(
      'state',
      JSON.stringify(JSON.parse(localStorage.getItem('state')).filter(elem => elem.id !== +id))
    );
    const index = this.state.filter(item => item.id !== id);
    if (index > -1) {
      this.state.splice(index, 1);
    }
  }
}

export default FilmsModel;
