import App from './App';
import NotificationController from './controllers/NotificationController';
import SearchController from './controllers/SearchController';
import ItemController from './controllers/ItemController';

const app = new App([new NotificationController(), new SearchController()]);

app.listen();