import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const sendUserInfo = () => {
    console.log(loginForm);
  };
  return (
    <div className="container ">
      <div className="row align-items-center">
        <div className="col-2"></div>
        <div className="forms col-8 d-flex flex-column justify-content-center">
          <p className="text-center">Воидите в учетную запись FrizCourses</p>

          <input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            className="input"
            type="text"
            placeholder="Email"
          />
          <input
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="input"
            type="password"
            placeholder="Пароль"
          />

          <div className="d-flex justify-content-lg-end">
            <button onClick={sendUserInfo} className="bord col-lg-2 col-12">
              Вход
            </button>
          </div>
          <p className="text-center under_inputs">
            Еше не зарегестрировались?{" "}
            <Link to="/registration">Зарегестрироваться</Link>
          </p>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default Login;