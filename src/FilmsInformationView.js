import EventEmitter from './helper';

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
  }
}
export default FilmsInformationView;
