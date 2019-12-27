class FilmsController {
  constructor(model, view, filmsinfoview, myfilmsview, mymodel, myfilmscontroller) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    this.myfilmsview = myfilmsview;
    this.mymodel = mymodel;
    this.myfilmscontroller = myfilmscontroller;
    view.on('add', this.addFilm.bind(this));
    view.on('remove', this.removeFilm.bind(this));
    view.on('draging', this.dragFilm.bind(this));
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

  dragFilm(film) {
    const [info] = this.model.state.filter(item => item.title === film);
    // this.filmsinfoview.filmId.textContent = `Id: ${info.id}`;
    this.filmsinfoview.filmName.textContent = `Название: ${info.title}`;
    this.filmsinfoview.filmDirector.textContent = `Режиссёр: ${info.director}`;
    this.filmsinfoview.filmGenre.textContent = `Жанр: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
    this.myfilmscontroller.addFilm([info.title, info.director, info.genre, info.description]);
  }
}

export default FilmsController;
