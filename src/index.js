import './assets/css/style.css';
import './index.html';
import App from './modules/App.js';
import Card from './modules/Card.js';
import Involvement from "./modules/Involvement.js";


const app = new App();

app.createNew().then(() => {
  app.populate(Card, 6);
});




