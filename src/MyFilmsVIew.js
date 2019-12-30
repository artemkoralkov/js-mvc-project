import EventEmiter from './helper';

class MyFilmsView extends EventEmiter {
  constructor() {
    super();
    this.list = document.getElementById('my-films-list');
    this.addingFilm = document.getElementById('my-Film');
    this.myFilm = document.getElementById('my-Film');
    this.myFilm.addEventListener('drop', this.handleDrop.bind(this));
    this.myFilm.addEventListener('dragover', this.handleDragOver.bind(this));
    this.myFilm.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createFilmItem(film) {
    const removeButton = document.createElement('button');
    removeButton.className = 'removeMy';
    const label = document.createElement('label');
    label.className = 'mytitle';
    label.textContent = film.title;
    const item = document.createElement('li');
    item.className = 'myfilm-Item';
    item.setAttribute('mydata-id', film.id);
    item.appendChild(removeButton);
    item.appendChild(label);
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.removeMy');
    const itemlabel = item.querySelector('label.mytitle');
    itemlabel.addEventListener('click', this.handleOnClick.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  /* handleAdd(event) {
    event.preventDefault();

    if (this.inputFilmName.value === '') {
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

    this.emit('add', [
      `${this.inputFilmName.value} `,
      `${this.inputFilmDirector.value}`,
      `${this.inputFilmGenre.value}`,
      `${this.inputFilmDescription.value}`,
    ]);

    return null;
  } */

  handleOnClick({ target }) {
    const name = target.textContent;
    this.emit('click', name);
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('removeMy', listItem.getAttribute('mydata-id'));
  }

  findlistItem(id) {
    return this.list.querySelector(`[mydata-id="${id}"]`);
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
    dropFilm.style.opacity = 1;
    this.emit('drop', event.dataTransfer.getData('Text'));
    return this;
  }

  addItem(film) {
    const listItem = this.createFilmItem(film);
    /*  this.inputFilmName.value = '';
    this.inputFilmDirector.value = '';
    this.inputFilmGenre.value = '';
    this.inputFilmDescription.value = ''; */
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    this.list.removeChild(listItem);
  }
}

export default MyFilmsView;
