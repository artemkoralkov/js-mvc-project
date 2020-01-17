import { EventEmitter, createElement } from './helpers';

class MyFilmsListView extends EventEmitter {
  constructor() {
    super();
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
    const itemlabel = item.querySelector('label.mytitle');
    const removeButton = item.querySelector('button.removeMy');
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
    if (localStorage.getItem('myFilmsListState') !== null) {
      const filmsNames = JSON.parse(localStorage.getItem('myFilmsListState')).map(
        element => element.title
      );
      if (filmsNames.includes(event.dataTransfer.getData('Text'))) {
        return null;
      }
    }
    this.emit('drop', event.dataTransfer.getData('Text'));
    return this;
  }

  addItem(film) {
    const listItem = this.createFilmItem(film);
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    listItem
      .querySelector('label.mytitle')
      .removeEventListener('click', this.handleOnClick.bind(this));
    listItem
      .querySelector('button.removeMy')
      .removeEventListener('click', this.handleRemove.bind(this));
    this.list.removeChild(listItem);
  }
}

export default MyFilmsListView;
