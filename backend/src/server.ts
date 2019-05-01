import App from './App';
import UserController from './controllers/UserController';
import HelpController from './controllers/HelpController';

//const app = new App([new UserController()]);
const app1 = new App([new HelpController()]);
app1.listen();
//app.listen();
