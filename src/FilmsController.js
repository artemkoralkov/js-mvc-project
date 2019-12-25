class FilmsController {
  constructor(model, view, filmsinfoview) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    view.on('add', this.addFilm.bind(this));
    view.on('remove', this.removeFilm.bind(this));
    view.on('draging', this.dragFilm.bind(this));
  }

  addFilm(filmName) {
    const film = this.model.addItem({
      id: this.model.state.length > 0 ? this.model.state[this.model.state.length - 1].id + 1 : 1,
      title: filmName[0],
      director: filmName[1],
      genre: filmName[2],
      description: filmName[3],
    });
    // alert(JSON.stringify(film));
    // alert(JSON.stringify(this.model.state));
    localStorage.setItem(film.id, JSON.stringify(film));
    this.view.addItem(film);
  }

  removeFilm(id) {
    localStorage.removeItem(id);
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  dragFilm(film) {
    const [info] = this.model.state.filter(item => item.title === film);
    // this.filmsinfoview.filmId.textContent = `Id: ${info.id}`;
    this.filmsinfoview.filmName.textContent = `Название: ${info.title}`;
    this.filmsinfoview.filmDirector.textContent = `Режиссёр: ${info.director}`;
    this.filmsinfoview.filmGenre.textContent = `Жанр: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `Описание: ${info.description}`;
  }
}

export default FilmsController;
