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
      <div>
        <Route path="(/|/login|/signup)" exact>
        <ul>
          <li class="home">
            <Link to="/" class='link-home'>Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
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
