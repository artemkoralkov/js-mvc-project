class FilmsController {
  constructor(model, view, filmsinfoview, mymodel, myview) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    this.mymodel = mymodel;
    this.myview = myview;
    view.on('add', this.addFilm.bind(this));
    view.on('remove', this.removeFilm.bind(this));
    view.on('click', this.clickOnFilm.bind(this));
  }

  addFilm(filmInfo) {
    const film = this.model.addItem({
      id: this.model.state.length > 0 ? this.model.state[this.model.state.length - 1].id + 1 : 1,
      title: filmInfo[0],
      director: filmInfo[1],
      genre: filmInfo[2],
      description: filmInfo[3],
      poster: filmInfo[4],
    });
    this.view.addItem(film);
  }

  removeFilm(id) {
    if (this.mymodel.mystate.map(element => element.id).includes(+id)) {
      this.mymodel.removeItem(id);
      this.myview.removeItem(id);
    }
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  clickOnFilm(film) {
    const [info] = this.model.state.filter(item => item.title === film);
    this.filmsinfoview.filmName.textContent = `Название: ${info.title}`;
    this.filmsinfoview.filmDirector.textContent = `Режиссёр: ${info.director}`;
    this.filmsinfoview.filmGenre.textContent = `Жанр: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
    this.filmsinfoview.filmImg.firstChild.setAttribute('src', info.poster);
  }
}

export default FilmsController;
