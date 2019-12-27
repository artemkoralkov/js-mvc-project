import EventEmiter from './helper';

class MyFilmsView extends EventEmiter {
  constructor() {
    super();
    this.list = document.getElementById('my-films-list');
  }

  createFilmItem(film, id) {
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    const label = document.createElement('label');
    label.className = 'mytitle';
    label.textContent = film;
    label.draggable = 'true';
    const item = document.createElement('li');
    item.className = 'myfilm-Item';
    item.setAttribute('data-id', id);
    item.appendChild(removeButton);
    item.appendChild(label);
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.remove');
    const itemlabel = item.querySelector('label.mytitle');
    itemlabel.addEventListener('dragend', this.handleDrag.bind(this));
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

  addItem(film, id) {
    const listItem = this.createFilmItem(film, id);
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
