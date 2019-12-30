class FilmsController {
  constructor(model, view, filmsinfoview) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
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
    });
    this.view.addItem(film);
  }

  removeFilm(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  clickOnFilm(film) {
    const [info] = this.model.state.filter(item => item.title === film);
    this.filmsinfoview.filmName.textContent = `Название: ${info.title}`;
    this.filmsinfoview.filmDirector.textContent = `Режиссёр: ${info.director}`;
    this.filmsinfoview.filmGenre.textContent = `Жанр: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
  }
}

export default FilmsController;
