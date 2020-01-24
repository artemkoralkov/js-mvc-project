import './Styles/main.css';
import FilmsListModel from './FilmsList/FilmsListModel';
import FilmsListView from './FilmsList/FilmsListView';
import FilmsListController from './FilmsList/FilmsListController';
import FilmsInformationView from './FilmsInformation/FilmsInformationView';
import MyFilmsListView from './MyFilsmList/MyFilmsListView';
import MyFilmsListModel from './MyFilsmList/MyFilmsListModel';
import MyFilmsListController from './MyFilsmList/MyFilmsListController';
import startFilmsArray from './helpers/startFilmsArray';
import { loadFromStorage } from './helpers/helpers';

const filmsListState = loadFromStorage('filmsListState');
const myFilmsListState = loadFromStorage('myFilmsListState');
const filmsListModel = new FilmsListModel();
const filmsListView = new FilmsListView();
const filmsInfoView = new FilmsInformationView();
const myFilmsListView = new MyFilmsListView();
const myFilmsListModel = new MyFilmsListModel();
const myFilmsListController = new MyFilmsListController(
  myFilmsListModel,
  myFilmsListView,
  filmsInfoView
);
const filmsListController = new FilmsListController(
  filmsListModel,
  filmsListView,
  filmsInfoView,
  myFilmsListModel,
  myFilmsListView,
  myFilmsListController
);
function addStartFilms(arrFilms, arrMyFilms) {
  arrFilms.forEach(element => {
    filmsListController.addFilm({
      title: element.title,
      director: element.director,
      genre: element.genre,
      description: element.description,
      poster: element.poster,
    });
  });
  if (myFilmsListState !== null) {
    arrMyFilms.forEach(element => {
      myFilmsListController.addFilm({
        id: element.id,
        title: element.title,
        director: element.director,
        genre: element.genre,
        description: element.description,
        poster: element.poster,
      });
    });
  }
}
if (filmsListState === null || filmsListState.length < 3) {
  startFilmsArray.forEach(element => {
    filmsListController.addFilm({
      title: element.title,
      director: element.director,
      genre: element.genre,
      description: element.description,
      poster: element.poster,
    });
  });
} else {
  addStartFilms(filmsListState, myFilmsListState);
}
