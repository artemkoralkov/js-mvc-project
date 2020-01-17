class FilmsListModel {
  constructor(state = []) {
    this.state = state;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    localStorage.setItem('filmsListState', JSON.stringify(this.state));
    return item;
  }

  removeItem(id) {
    this.state = this.state.filter(item => item.id !== +id);
    localStorage.setItem('filmsListState', JSON.stringify(this.state));
  }
}

export default FilmsListModel;
