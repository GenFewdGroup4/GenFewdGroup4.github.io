import { useHistory } from "react-router-dom";
import './user.css'; //app.js

export default function User() {
    let history = useHistory();

    let handleLoginClick = () => {
        console.log('click login')
        history.push('/login')
    }
    let handleSignupClick = () => {
        console.log('click signup')
        history.push('/signup')
    }

    return (
        <div className='useMain'>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleSignupClick}>Signup</button>
        </div>
    )
}