import EventEmiter from './helper';

class FilmsView extends EventEmiter {
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
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    const label = document.createElement('label');
    label.className = 'title';
    label.textContent = film.title;
    label.draggable = 'true';
    const item = document.createElement('li');
    item.className = 'film-Item';
    item.setAttribute('data-id', film.id);
    item.appendChild(removeButton);
    item.appendChild(label);
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.remove');
    const itemlabel = item.querySelector('label.title');
    itemlabel.addEventListener('dragstart', this.handleDragStart.bind(this));
    itemlabel.addEventListener('click', this.handleClick.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  handleAdd(event) {
    event.preventDefault();
    const filmsNames = JSON.parse(localStorage.getItem('state')).map(element => element.title);
    if (filmsNames.includes(`${this.inputFilmName.value}`)) {
      this.inputFilmName.value = 'Фильм уже есть в списке';
      return null;
    }
    if (this.inputFilmName.value === '' || this.inputFilmName.value === 'Фильм уже есть в списке') {
      return null;
    }
    if (this.inputFilmDirector.value === '') {
      return null;
    }
    if (this.inputFilmGenre.value === '') {
      return null;
    }
    if (this.inputFilmDescription.value === '') {
      return null;
    }
    if (this.inputImgSrc.value === '') {
      this.inputImgSrc.value =
        'C:/Users/Пользователь/Documents/js-project/src/images/img_not_found.png';
      this.emit('add', [
        `${this.inputFilmName.value}`,
        `${this.inputFilmDirector.value}`,
        `${this.inputFilmGenre.value}`,
        `${this.inputFilmDescription.value}`,
        `${this.inputImgSrc.value}`,
      ]);
      return null;
    }

    this.emit('add', [
      `${this.inputFilmName.value}`,
      `${this.inputFilmDirector.value}`,
      `${this.inputFilmGenre.value}`,
      `${this.inputFilmDescription.value}`,
      `${this.inputImgSrc.value}`,
    ]);

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
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    this.list.removeChild(listItem);
  }
}

export default FilmsView;
