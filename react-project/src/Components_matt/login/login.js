import { useRef, useCallback, useState } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils';
import { useHistory } from "react-router-dom";
import './login.css'

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [errMsg, setErrMsg] = useState('')
    let history = useHistory()

    const handleClick = useCallback(async() => {
        const formObject = {};
        formObject['username'] = usernameRef.current.value;
        formObject['password'] = passwordRef.current.value;
        console.log(formObject);

        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject),
        })
        let jsonResponse = await response.json();
        console.log('jsonResponse', jsonResponse)
        setErrMsg(jsonResponse.message)

        if (jsonResponse.message === 'success') {
            alert('good')
            history.push('/DesktopApp')
        } else {
            alert('bad: ' + jsonResponse.message)
        }

    }, [usernameRef, passwordRef])

    return <div className = 'login' >
        <
        div className = "div-login" > Login~~ < /div> <
        div > username: < input ref = { usernameRef }
    value = 'matt@gmail.com' / > < /div> <
        div > password: < input ref = { passwordRef }
    value = '123' / > < /div> {
        errMsg !== '' ? < div > error : { errMsg } < /div> : null} <
            button onClick = { handleClick }
        class = "button" > login < /button> <
            /div>

    }