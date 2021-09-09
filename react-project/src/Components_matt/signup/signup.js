import { useRef, useCallback, useState } from "react";

export default function Signup() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleClick = useCallback(async () => {
    const formObject = {};
    formObject["username"] = usernameRef.current.value;
    formObject["password"] = passwordRef.current.value;
    console.log(formObject);

    if (formObject["username"] === "") {
      setErrMsg("username is empty");
    } else if (formObject["password"] === "") {
      setErrMsg("password is empty");
    }

    const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    let jsonResponse = await response.json();
    console.log("jsonResponse", jsonResponse);
    setErrMsg(jsonResponse.message);

    if (jsonResponse.message === "success") {
      alert("good");
    } else {
      alert("bad: " + jsonResponse.message);
    }
  }, [usernameRef, passwordRef]);

  return (
    <div>
      <div className="div-signup">
        <h3 class="text-center text-white pt-5">Sign up form</h3>
        <div class="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="signup-column" class="col-md-6">
              <div id="signup-box" class="col-md-12">
                <h3 class="text-center text-info">Sign up</h3>
                <div class="form-group">
                  <label for="username" class="text-info">
                    Username:
                  </label>
                  <input ref={usernameRef} />
                </div>
                <div class="form-group">
                  <label for="password" class="text-info">
                    Password:
                  </label>
                  <input ref={passwordRef} />
                </div>
                {errMsg !== "" ? <div>error: {errMsg}</div> : null}
                <button onClick={handleClick}>signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
