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
  myFilmsModel,
  MyFilmsController
);
function startFilms(arrFilms, arrMyFilms) {
  arrFilms.forEach(element => {
    filmsController.addFilm([element.title, element.director, element.genre, element.description]);
  });
  arrMyFilms.forEach(element => {
    myFilmsController.addFilm([
      element.title,
      element.director,
      element.genre,
      element.description,
    ]);
  });
}
startFilms(JSON.parse(localStorage.getItem('state')), JSON.parse(localStorage.getItem('mystate')));
