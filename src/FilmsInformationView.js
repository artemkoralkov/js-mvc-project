import EventEmitter from './helper';

class FilmsInformationView extends EventEmitter {
  constructor() {
    super();
    this.filmId = document.getElementById('film-id');
    this.filmName = document.getElementById('film-name');
    this.filmDirector = document.getElementById('film-director');
    this.filmGenre = document.getElementById('film-genre');
    this.filmDescription = document.getElementById('film-description');
    this.film = document.getElementById('film-info');
    this.film.addEventListener('drop', this.handleDrop.bind(this));
    this.film.addEventListener('dragover', this.handleDragOver.bind(this));
  }

  handleDragOver(event) {
    event.preventDefault();
    const dragOverLabel = event.target;
    dragOverLabel.style.opacity = 0.5;
    return this;
  }

  handleDragLeave(event) {
    event.preventDefault();
    const dragLeavingLabel = event.target;
    dragLeavingLabel.style.opacity = 1;
    return this;
  }

  handleDrop(event) {
    event.preventDefault();
    const dropFilm = event.target;
    if (event.dataTransfer.getData('Text') !== '') {
      dropFilm.textContent = event.dataTransfer;
    }
    dropFilm.style.opacity = 1;
    return this;
  }
}
export default FilmsInformationView;
