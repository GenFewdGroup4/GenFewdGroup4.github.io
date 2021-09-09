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
            <button className='useMain-button-login' onClick={handleLoginClick}>Login</button>
            <button className='useMain-button-signup' onClick={handleSignupClick}>Signup</button>
        </div>
    )
}