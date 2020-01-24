class MyFilmsListController {
  constructor(myFilmsListModel, myFilmsListView, filmsInfoView) {
    this.myFilmsListModel = myFilmsListModel;
    this.myFilmsListView = myFilmsListView;
    this.filmsInfoView = filmsInfoView;
    myFilmsListView.on('removeMyFilm', this.removeFilm.bind(this));
    myFilmsListView.on('click', this.clickOnFilm.bind(this));
    myFilmsListView.on('drop', this.addFilm.bind(this));
    myFilmsListView.on('clear', this.clear.bind(this));
  }

  clear() {
    localStorage.removeItem('myFilmsListState');
    this.myFilmsListModel.state = [];
  }

  addFilm(filmInfo) {
    if (!this.myFilmsListModel.state.map(elem => elem.id).includes(filmInfo.id)) {
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
  }

  removeFilm(id) {
    this.myFilmsListModel.removeItem(id);
    this.myFilmsListView.removeItem(id);
  }

  clickOnFilm(film) {
    const [filmInfo] = this.myFilmsListModel.state.filter(item => item.title === film);
    this.filmsInfoView.addInfo(filmInfo);
  }
}

export default MyFilmsListController;
