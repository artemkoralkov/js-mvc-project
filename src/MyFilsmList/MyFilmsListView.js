import { EventEmitter, createElement } from '../helpers/helpers';

class MyFilmsListView extends EventEmitter {
  constructor() {
    super();
    this.filmsListState = JSON.parse(localStorage.getItem('filmsListState'));
    this.list = document.getElementById('my-films-list');
    this.addingFilm = document.getElementById('my-Film');
    this.clearMyFilms = document.getElementById('clear-my-films');
    this.sortButton = document.getElementById('sort-my-films');
    this.sortButton.addEventListener('click', this.handleSort.bind(this));
    this.clearMyFilms.addEventListener('click', this.handleClear.bind(this));
    this.list.addEventListener('drop', this.handleDrop.bind(this));
    this.list.addEventListener('dragover', this.handleDragOver.bind(this));
    this.list.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createFilmItem(film) {
    const removeButton = createElement('button', { className: 'removeMyFilm' });
    const label = createElement('label', { className: 'my-title' }, film.title);
    const item = createElement(
      'li',
      { className: 'my-film-item', 'data-id': film.id },
      removeButton,
      label
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const itemlabel = item.querySelector('label.my-title');
    const removeButton = item.querySelector('button.removeMyFilm');
    itemlabel.addEventListener('click', this.handleOnClick.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  handleSort() {
    const sortList = [];
    for (let i = 0; i < this.list.children.length; i += 1) {
      sortList.push({
        id: this.list.children[i].attributes[1].textContent,
        text: this.list.children[i].lastElementChild.textContent,
      });
    }
    sortList.sort((a, b) => {
      if (a.text > b.text) {
        return 1;
      }
      if (a.text < b.text) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < this.list.children.length; i += 1) {
      this.list.children[i].attributes[1].textContent = sortList[i].id;
      this.list.children[i].lastElementChild.textContent = sortList[i].text;
    }
  }

  handleClear() {
    Array.from(this.list.childNodes).forEach(element => element.remove());
    this.emit('clear', null);
  }

  handleOnClick({ target }) {
    const name = target.textContent;
    this.emit('click', name);
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('removeMyFilm', listItem.getAttribute('data-id'));
  }

  findlistItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
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
    const dropFilmLabel = event.target;
    dropFilmLabel.style.opacity = 1;
    const [filmInfo] = this.filmsListState.filter(
      elem => elem.title === event.dataTransfer.getData('Text')
    );
    this.emit('drop', filmInfo);
    return this;
  }

  addItem(film) {
    const listItem = this.createFilmItem(film);
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    listItem
      .querySelector('label.my-title')
      .removeEventListener('click', this.handleOnClick.bind(this));
    listItem
      .querySelector('button.removeMyFilm')
      .removeEventListener('click', this.handleRemove.bind(this));
    this.list.removeChild(listItem);
  }
}

export default MyFilmsListView;
