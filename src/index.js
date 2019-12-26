import './Styles/main.css';
import FilmsModel from './FilmsModel';
import FilmsView from './FilmsView';
import FilmsController from './FilmsController';
import FilmsInformationView from './FilmsInformationView';

const filmsModel = new FilmsModel();
const filmsView = new FilmsView();
const filmsInfoView = new FilmsInformationView();
const filmsController = new FilmsController(filmsModel, filmsView, filmsInfoView);
// localStorage.clear();
/* const storage = [];
const keys = Object.keys(localStorage);
for (const key of keys) {
  if (localStorage.getItem(key) !== 'INFO') {
    storage.push(JSON.parse(localStorage.getItem(key)));
  }
} */
function start(arr) {
  arr.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  });
}
start(JSON.parse(localStorage.getItem('state')));
