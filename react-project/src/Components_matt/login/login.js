import { useRef, useCallback, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { useHistory } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  let history = useHistory();

  const handleClick = useCallback(async () => {
    const formObject = {};
    formObject["username"] = usernameRef.current.value;
    formObject["password"] = passwordRef.current.value;
    console.log(formObject);

    const response = await fetch("http://localhost:8080/user/login", {
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
      alert("Wellcome to Online to-do-list");
      history.push("/DesktopApp");
    } else {
      alert("Log in unsucessful: " + jsonResponse.message);
    }
  }, [usernameRef, passwordRef]);

  return (
    <div className="div-login">
      <h3 class="text-center text-white pt-5">Login form</h3>
      <div class="container">
        <div
          id="login-row"
          class="row justify-content-center align-items-center"
        >
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="username" class="text-info">
                  Username:
                </label>
                <input
                  ref={usernameRef}
                  value="matt@gmail.com"
                  id="username"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">
                  Password:
                </label>
                <input ref={passwordRef} value="123" />
              </div>
              <div class="form-group">
                <label for="remember-me" class="text-info">
                  <span>Remember me</span> 
                  <span>
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                    />
                  </span>
                </label>
                <input
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-md"
                  value="submit"
                />
              </div>{" "}
              /{errMsg !== "" ? <div> error : {errMsg} </div> : null}
              <button onClick={handleClick} class="button-login">
                <label className="label-login">login</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
