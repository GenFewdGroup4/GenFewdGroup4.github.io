import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/login/login'
import Signup from './Components/signup/signup'
import User from './Components/user/user'
import Todolist from './Components/todolist/todolist'

 function App() {
  return (
    <Router>
      <div>
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
        </ul>

        <hr />

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
