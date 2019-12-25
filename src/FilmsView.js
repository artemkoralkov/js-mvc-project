import EventEmiter from './helper';

class FilmsView extends EventEmiter {
  constructor() {
    super();
    this.form = document.getElementById('films-Lib');
    this.filterButton = document.createElement('button');
    this.inputFilmName = document.getElementById('add-film-Name');
    this.inputFilmDirector = document.getElementById('add-film-Director');
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
    itemlabel.addEventListener('dragend', this.handleDrag.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  handleAdd(event) {
    event.preventDefault();

    if (this.inputFilmName.value === '') {
      return null;
    }
    if (this.inputFilmDirector.value === '') {
      return null;
    }

    this.emit('add', [`${this.inputFilmName.value} `, `${this.inputFilmDirector.value}`]);

    return null;
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;

    this.emit('remove', listItem.getAttribute('data-id'));
  }

  findlistItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleDrag({ target }) {
    const draw = target.textContent;
    this.emit('draging', draw);
  }

  addItem(film) {
    const listItem = this.createFilmItem(film);
    this.inputFilmName.value = '';
    this.inputFilmDirector.value = '';
    this.inputFilmDescription = '';
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    this.list.removeChild(listItem);
  }
}

export default FilmsView;
