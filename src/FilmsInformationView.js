import { EventEmitter } from './helpers';

class FilmsInformationView extends EventEmitter {
  constructor() {
    super();
    this.filmId = document.getElementById('film-id');
    this.filmName = document.getElementById('film-name');
    this.filmDirector = document.getElementById('film-director');
    this.filmGenre = document.getElementById('film-genre');
    this.filmDescription = document.getElementById('film-description');
    this.usingFilm = document.getElementById('film-info');
    this.filmImg = document.getElementById('film-poster');
    this.addInfo = this.addInfo.bind(this);
  }

  addInfo(info) {
    this.filmName.innerHTML = `<b>Название</b>: ${info.title}`;
    this.filmDirector.innerHTML = `<b>Режиссёр</b>: ${info.director}`;
    this.filmGenre.innerHTML = `<b>Жанр</b>: ${info.genre}`;
    this.filmDescription.textContent = `${info.description}`;
    this.filmImg.firstChild.src = `${info.poster}`;
  }
}
export default FilmsInformationView;
