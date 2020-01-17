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
    filmsListView.on('add', this.addFilm.bind(this));
    filmsListView.on('remove', this.removeFilm.bind(this));
    filmsListView.on('click', this.clickOnFilm.bind(this));
    filmsListView.on('sendClick', this.clikOnSend.bind(this));
  }

  clikOnSend(film) {
    const [info] = this.filmsListModel.state.filter(item => item.title === film);
    if (this.myFilmsListModel.state.map(elem => elem.title).includes(info.title)) {
      return;
    }
    this.myFilmsListController.addFilm(info);
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
    const [info] = this.filmsListModel.state.filter(item => item.title === film);
    this.filmsInfoView.addInfo(info);
  }
}

export default FilmsListController;
