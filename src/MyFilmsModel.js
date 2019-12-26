class MyFilmsModel {
  constructor(mystate = []) {
    this.mystate = mystate;
  }

  getItem(id) {
    return this.mystate.find(item => item.id === id);
  }

  addItem(item) {
    this.mystate.push(item);
    localStorage.setItem('mystate', JSON.stringify(this.mystate));
    return item;
  }

  removeItem(id) {
    localStorage.setItem(
      'mystate',
      JSON.stringify(JSON.parse(localStorage.getItem('mystate')).filter(elem => elem.id !== +id))
    );
    const index = this.mystate.filter(item => item.id !== id);
    if (index > -1) {
      this.mystate.splice(index, 1);
    }
  }
}

export default MyFilmsModel;
