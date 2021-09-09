import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login/login'
import Signup from './signup/signup'
import User from './user/user'
import Todolist from './todolist/todolist'
import DesktopApp from '../DesktopApp'

 function App() {
  return (
    <Router>
      <div classname="app-div">
        <Route path="(/|/login|/signup)" exact>
        <ul classname="app-ul">
          <li classname="app-home">
            <Link to="/" class='link-home' classname="link-app-home">Home</Link>
          </li>
          <li classname="app-home">
            <Link to="/login" classname="link-app-user">Login</Link>
          </li>
          <li classname="app-home">
            <Link to="/signup" classname="link-app-user">Signup</Link>
          </li>
          <li classname="app-home">
            <Link to="/DesktopApp"></Link>
          </li>
        </ul>
        </Route>
        
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path='/todolist'>
            <Todolist />
          </Route>
          <Route path='/DesktopApp'>
            <DesktopApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
