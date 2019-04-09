import App from './App';
import RoomController from './controllers/RoomController';
import SnackController from './controllers/SnackController';

const app = new App([new RoomController(), new SnackController()]);

app.listen();
