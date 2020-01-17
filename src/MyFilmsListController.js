class MyFilmsListController {
  constructor(myFilmsListModel, myFilmsListView, filmsInfoView) {
    this.myFilmsListModel = myFilmsListModel;
    this.myFilmsListView = myFilmsListView;
    this.filmsInfoView = filmsInfoView;
    myFilmsListView.on('removeMy', this.removeFilm.bind(this));
    myFilmsListView.on('click', this.clickOnFilm.bind(this));
    myFilmsListView.on('drop', this.prepare.bind(this));
    myFilmsListView.on('clear', this.clear.bind(this));
  }

  prepare(film) {
    const filmstate = JSON.parse(localStorage.getItem('filmsListState')).map(elem => elem.title);
    const index = filmstate.indexOf(film);
    const info = JSON.parse(localStorage.getItem('filmsListState'))[index];
    return this.addFilm(info);
  }

  clear() {
    localStorage.removeItem('myFilmsListState');
    this.myFilmsListModel.state = [];
  }

  addFilm(filmInfo) {
    const film = this.myFilmsListModel.addItem({
      id: filmInfo.id,
      title: filmInfo.title,
      director: filmInfo.director,
      genre: filmInfo.genre,
      description: filmInfo.description,
      poster: filmInfo.poster,
    });
    this.myFilmsListView.addItem(film);
  }

  removeFilm(id) {
    this.myFilmsListModel.removeItem(id);
    this.myFilmsListView.removeItem(id);
  }

  clickOnFilm(film) {
    const [info] = this.myFilmsListModel.state.filter(item => item.title === film);
    this.filmsInfoView.addInfo(info);
  }
}

export default MyFilmsListController;
