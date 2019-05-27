import App from './App';

import UserController from './controllers/UserController';
import AdminController from './controllers/AdminController';

const app = new App([new UserController(), new AdminController()]);

app.listen();
