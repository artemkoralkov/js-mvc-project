class MyFilmsController {
  constructor(model, view, filmsinfoview) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    view.on('removeMy', this.removeFilm.bind(this));
    view.on('click', this.clickOnFilm.bind(this));
    view.on('drop', this.prepare.bind(this));
    view.on('clear', this.clear.bind(this));
  }

  prepare(film) {
    const filmstate = JSON.parse(localStorage.getItem('state')).map(elem => elem.title);
    const index = filmstate.indexOf(film);
    const info = Object.values(JSON.parse(localStorage.getItem('state'))[index]);
    return this.addFilm(info);
  }

  clear() {
    localStorage.removeItem('mystate');
    this.model.mystate = [];
  }

  addFilm(filmInfo) {
    const film = this.model.addItem({
      id: +filmInfo[0],
      title: filmInfo[1],
      director: filmInfo[2],
      genre: filmInfo[3],
      description: filmInfo[4],
      poster: filmInfo[5],
    });
    this.view.addItem(film);
  }

  removeFilm(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  clickOnFilm(film) {
    const [info] = this.model.mystate.filter(item => item.title === film);
    this.filmsinfoview.filmName.innerHTML = `<b>Название</b>: ${info.title}`;
    this.filmsinfoview.filmDirector.innerHTML = `<b>Режиссёр</b>: ${info.director}`;
    this.filmsinfoview.filmGenre.innerHTML = `<b>Жанр</b>: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
    this.filmsinfoview.filmImg.firstChild.src = `${info.poster}`;
  }
}

export default MyFilmsController;
