import unirest from 'unirest';
import { EventEmitter, createElement } from './helpers';
import image from './images/img-not-found.png';

const regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i;

class FilmsListView extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById('films-Lib');
    this.filterButton = document.createElement('button');
    this.inputFilmName = document.getElementById('add-film-Name');
    this.inputFilmDirector = document.getElementById('add-film-Director');
    this.inputFilmGenre = document.getElementById('add-film-Genre');
    this.inputFilmDescription = document.getElementById('add-film-Description');
    this.inputImgSrc = document.getElementById('add-film-poster');
    this.list = document.getElementById('films-list');
    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createFilmItem(film) {
    const removeButton = createElement('button', { className: 'remove' });
    const sendButton = createElement('button', { className: 'send' }, '+');
    const label = createElement('label', { className: 'title', draggable: 'true' }, film.title);
    const item = createElement(
      'li',
      { className: 'film-Item', 'data-id': film.id },
      removeButton,
      sendButton,
      label
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.remove');
    const itemlabel = item.querySelector('label.title');
    const sendButton = item.querySelector('button.send');
    itemlabel.addEventListener('dragstart', this.handleDragStart.bind(this));
    itemlabel.addEventListener('click', this.handleClick.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    sendButton.addEventListener('click', this.handleClickOnSend.bind(this));
    return item;
  }

  handleClickOnSend({ target }) {
    const name = target.parentNode.children[2].textContent;
    this.emit('sendClick', name);
  }

  handleAdd(event) {
    event.preventDefault();
    const filmsNames = JSON.parse(localStorage.getItem('filmsListState')).map(
      element => element.title
    );
    if (filmsNames.includes(`${this.inputFilmName.value}`)) {
      this.inputFilmName.value = 'Фильм уже есть в списке';
      return null;
    }
    if (
      this.inputFilmName.value === '' ||
      this.inputFilmName.value === 'Фильм уже есть в списке' ||
      this.inputFilmDirector.value === '' ||
      this.inputFilmGenre.value === '' ||
      this.inputFilmDescription.value === ''
    ) {
      return null;
    }
    if (
      this.inputFilmGenre.value === '' &&
      this.inputFilmDirector.value === '' &&
      this.inputFilmDescription.value === '' &&
      this.inputImgSrc.value === '' &&
      this.inputFilmName.value !== ''
    ) {
      unirest
        .get(`http://www.omdbapi.com/?t=${this.inputFilmName.value}&apikey=4085b160`)
        .end(response => {
          if (response.body.Response === 'False') {
            this.inputFilmName.value = `${response.body.Error}, введите название на английском`;
          } else if (filmsNames.includes(response.body.Title)) {
            this.inputFilmName.value = 'Фильм уже есть в списке';
            return null;
          }
          this.emit('add', {
            title: `${response.body.Title}`,
            director: `${response.body.Director}`,
            genre: `${response.body.Genre}`,
            description: `${response.body.Plot}`,
            poster: `${response.body.Poster}`,
          });
          return null;
        });
      return null;
    }
    if (this.inputImgSrc.value === '' || !this.inputImgSrc.value.match(regURL)) {
      this.emit('add', {
        title: `${this.inputFilmName.value}`,
        director: `${this.inputFilmDirector.value}`,
        genre: `${this.inputFilmGenre.value}`,
        description: `${this.inputFilmDescription.value}`,
        poster: `${image}`,
      });
      return null;
    }
    this.emit('add', {
      title: `${this.inputFilmName.value}`,
      director: `${this.inputFilmDirector.value}`,
      genre: `${this.inputFilmGenre.value}`,
      description: `${this.inputFilmDescription.value}`,
      poster: `${this.inputImgSrc.value}`,
    });

    return null;
  }

  handleClick({ target }) {
    const name = target.textContent;
    this.emit('click', name);
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;

    this.emit('remove', listItem.getAttribute('data-id'));
  }

  findlistItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleDragStart(event) {
    event.dataTransfer.setData('Text', event.target.textContent);
    return this;
  }

  addItem(film) {
    const listItem = this.createFilmItem(film);
    this.inputFilmName.value = '';
    this.inputFilmDirector.value = '';
    this.inputFilmGenre.value = '';
    this.inputFilmDescription.value = '';
    this.inputImgSrc.value = '';
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    const labelTitle = listItem.querySelector('label.title');
    labelTitle.removeEventListener('dragstart', this.handleDragStart.bind(this));
    labelTitle.removeEventListener('click', this.handleClick.bind(this));
    listItem
      .querySelector('button.remove')
      .removeEventListener('click', this.handleRemove.bind(this));
    listItem
      .querySelector('button.send')
      .removeEventListener('click', this.handleClickOnSend.bind(this));
    this.list.removeChild(listItem);
  }
}

export default FilmsListView;
