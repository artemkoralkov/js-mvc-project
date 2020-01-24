import Model from '../helpers/Model';

const storageKeyName = 'filmsListState';

class FilmsListModel extends Model {
  constructor() {
    super(storageKeyName);
  }
}

export default FilmsListModel;
