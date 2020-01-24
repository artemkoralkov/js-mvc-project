class FilmsListController {
  constructor(
    filmsListModel,
    filmsListView,
    filmsInfoView,
    myFilmsListModel,
    myFilmsListView,
    myFilmsListController
  ) {
    this.filmsListModel = filmsListModel;
    this.filmsListView = filmsListView;
    this.filmsInfoView = filmsInfoView;
    this.myFilmsListModel = myFilmsListModel;
    this.myFilmsListView = myFilmsListView;
    this.myFilmsListController = myFilmsListController;
    filmsListView.on('addFilm', this.addFilm.bind(this));
    filmsListView.on('removeFilm', this.removeFilm.bind(this));
    filmsListView.on('clickOnFilm', this.clickOnFilm.bind(this));
    filmsListView.on('clickO  nSendButton', this.sendFilmToMyFilms.bind(this));
  }

  sendFilmToMyFilms(film) {
    const [filmInfo] = this.filmsListModel.state.filter(item => item.title === film);
    if (this.myFilmsListModel.state.map(elem => elem.title).includes(filmInfo.title)) {
      return;
    }
    this.myFilmsListController.addFilm(filmInfo);
  }

  addFilm(filmInfo) {
    const film = this.filmsListModel.addItem({
      id:
        this.filmsListModel.state.length > 0
          ? this.filmsListModel.state[this.filmsListModel.state.length - 1].id + 1
          : 1,
      title: filmInfo.title,
      director: filmInfo.director,
      genre: filmInfo.genre,
      description: filmInfo.description,
      poster: filmInfo.poster,
    });
    this.filmsListView.addItem(film);
  }

  removeFilm(id) {
    if (this.myFilmsListModel.state.map(element => element.id).includes(+id)) {
      this.myFilmsListModel.removeItem(id);
      this.myFilmsListView.removeItem(id);
    }
    this.filmsListModel.removeItem(id);
    this.filmsListView.removeItem(id);
  }

  clickOnFilm(film) {
    const [filmInfo] = this.filmsListModel.state.filter(item => item.title === film);
    this.filmsInfoView.addInfo(filmInfo);
  }
}

export default FilmsListController;
