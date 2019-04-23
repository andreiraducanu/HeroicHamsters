import App from './App';
import NotificationController from './controllers/NotificationController';

const app = new App([new NotificationController()]);

app.listen();