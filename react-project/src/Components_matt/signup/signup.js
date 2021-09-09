import {useRef, useCallback, useState} from 'react'

export default function Signup() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [errMsg, setErrMsg] = useState('')

    const handleClick = useCallback(async() => {
        const formObject = {};
        formObject['username'] = usernameRef.current.value;
        formObject['password'] = passwordRef.current.value;
        console.log(formObject);

        if (formObject['username'] === '') {
            setErrMsg('username is empty')
        } else if (formObject['password'] === '') {
            setErrMsg('password is empty')
        }

        const response = await fetch('http://localhost:8080/user/register', {
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
        } else {
            alert('bad: ' + jsonResponse.message)
        }
    }, [usernameRef, passwordRef])

    return <div>
        <div>Signup!!!!</div>
        <div>username: <input ref={usernameRef} /></div>
        <div>password: <input ref={passwordRef} /></div>
        {errMsg !== '' ? <div>error: {errMsg}</div> : null}
        <button onClick={handleClick}>signup</button>
    </div>
}