class MyFilmsController {
  constructor(model, view, filmsinfoview) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    // view.on('add', this.addFilm.bind(this));
    view.on('removeMy', this.removeFilm.bind(this));
    view.on('click', this.clickOnFilm.bind(this));
    view.on('drop', this.prepare.bind(this));
  }

  prepare(film) {
    let filmstate = JSON.parse(localStorage.getItem('state'));
    filmstate = filmstate.map(elem => elem.title);
    const index = filmstate.indexOf(film);
    filmstate = JSON.parse(localStorage.getItem('state'));
    const info = Object.values(filmstate[index]);
    // localStorage.removeItem('mystate');
    return this.addFilm(info);
  }

  addFilm(filmInfo) {
    const film = this.model.addItem({
      id: +filmInfo[0],
      /* this.model.mystate.length > 0
          ? this.model.mystate[this.model.mystate.length - 1].id + 1
          : 1, */
      title: filmInfo[1],
      director: filmInfo[2],
      genre: filmInfo[3],
      description: filmInfo[4],
    });
    this.view.addItem(film);
  }

  removeFilm(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  clickOnFilm(film) {
    const [info] = this.model.mystate.filter(item => item.title === film);
    this.filmsinfoview.filmName.textContent = `Название: ${info.title}`;
    this.filmsinfoview.filmDirector.textContent = `Режиссёр: ${info.director}`;
    this.filmsinfoview.filmGenre.textContent = `Жанр: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
  }
}

export default MyFilmsController;
