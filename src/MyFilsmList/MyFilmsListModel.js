import Model from '../helpers/Model';

const storageKeyName = 'myFilmsListState';

class MyFilmsListModel extends Model {
  constructor() {
    super(storageKeyName);
  }
}

export default MyFilmsListModel;
