import App from './App';

import UserController from './controllers/UserController';
import AdminController from './controllers/AdminController';
import HelpController from './controllers/HelpController';

const app = new App([new UserController(), new AdminController(), new HelpController()]);

app.listen();
