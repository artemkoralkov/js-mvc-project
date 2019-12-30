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
  myFilmsView,
  MyFilmsController
);
/* const films = [{ id: 1, title: '1', director: '2', genre: '3', description: '4' }]; */
// localStorage.setItem('state', JSON.stringify(films));
function startFilms(arrFilms, arrMyFilms /* , arrStart */) {
  arrFilms.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  });
  /* arrStart.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  }); */
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
startFilms(
  JSON.parse(localStorage.getItem('state')),
  JSON.parse(localStorage.getItem('mystate')) /* , */
  /*   films */
);
