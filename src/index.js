import './Styles/main.css';
import FilmsModel from './FilmsModel';
import FilmsView from './FilmsView';
import FilmsController from './FilmsController';
import FilmsInformationView from './FilmsInformationView';
import MyFilmsView from './MyFilmsView';
import MyFilmsModel from './MyFilmsModel';
import MyFilmsController from './MyFilmsController';

const filmsModel = new FilmsModel();
const filmsView = new FilmsView();
const filmsInfoView = new FilmsInformationView();
const myFilmsView = new MyFilmsView();
const myFilmsModel = new MyFilmsModel();
const myFilmsController = new MyFilmsController(myFilmsModel, myFilmsView, filmsInfoView);
const filmsController = new FilmsController(
  filmsModel,
  filmsView,
  filmsInfoView,
  myFilmsModel,
  myFilmsView
);
const films = [
  { title: '1', director: '2', genre: '3', description: '4' },
  { title: '2', director: '3', genre: '4', description: '5' },
];
function startFilms(arrFilms, arrMyFilms) {
  arrFilms.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  });
  arrMyFilms.forEach(element => {
    myFilmsController.addFilm([
      element.id,
      element.title,
      element.director,
      element.genre,
      element.description,
    ]);
  });
}
if (localStorage.getItem('state').length < 3) {
  films.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  });
} else {
  startFilms(
    JSON.parse(localStorage.getItem('state')),
    JSON.parse(localStorage.getItem('mystate'))
  );
}
