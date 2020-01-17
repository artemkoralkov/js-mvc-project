class MyFilmsListModel {
  constructor(state = []) {
    this.state = state;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    localStorage.setItem('myFilmsListState', JSON.stringify(this.state));
    return item;
  }

  removeItem(id) {
    this.state = this.state.filter(item => item.id !== +id);
    localStorage.setItem('myFilmsListState', JSON.stringify(this.state));
  }
}

export default MyFilmsListModel;
