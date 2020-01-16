class FilmsController {
  constructor(model, view, filmsinfoview, mymodel, myview, mycontroller) {
    this.model = model;
    this.view = view;
    this.filmsinfoview = filmsinfoview;
    this.mymodel = mymodel;
    this.myview = myview;
    this.mycontroller = mycontroller;
    view.on('add', this.addFilm.bind(this));
    view.on('remove', this.removeFilm.bind(this));
    view.on('click', this.clickOnFilm.bind(this));
    view.on('sendClick', this.clikOnSend.bind(this));
  }

  clikOnSend(film) {
    const [info] = this.model.state.filter(item => item.title === film);
    if (this.mymodel.mystate.map(elem => elem.title).includes(info.title)) {
      return;
    }
    this.mycontroller.addFilm(Object.values(info));
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
    this.filmsinfoview.filmName.innerHTML = `<b>Название</b>: ${info.title}`;
    this.filmsinfoview.filmDirector.innerHTML = `<b>Режиссёр</b>: ${info.director}`;
    this.filmsinfoview.filmGenre.innerHTML = `<b>Жанр</b>: ${info.genre}`;
    this.filmsinfoview.filmDescription.textContent = `${info.description}`;
    this.filmsinfoview.filmImg.firstChild.setAttribute('src', info.poster);
  }
}

export default FilmsController;
