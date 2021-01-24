import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  const [cek, setCek] = useState(false);
  useEffect(() => {
    localStorage.clear();
  }, []);

  const LoginAdmin = async () => {
    const todoRef = firebase.database().ref("DataAdmin");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      let validEmail =
        todoList[0].email == email
          ? todoList[0].password == password
            ? onSubmit(todoList)
            : (setCek(true), setStatus("password salah"))
          : LoginPolsek();
    });
  };

  const LoginPolsek = async () => {
    const todoRef = await firebase.database().ref("DataPolsek");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        console.log(todos[id].Email == email);
        todos[id].Email == email
          ? todoList.push({ id, ...todos[id] })
          : console.log("nopush");
      }
      if (todoList.length > 0) {
        todoList[0].email = todoList[0].Email;
        todoList[0].nama = todoList[0].NamaKantor;
        let validEmail =
          todoList[0].Password == password
            ? onSubmit(todoList)
            : (setCek(true), setStatus("password salah"));
      } else {
        setCek(true);
        setStatus("email tidak terdaftar");
      }
    });
  };

  const onSubmit = (data) => {
    localStorage.setItem("email", data[0].email);
    localStorage.setItem("nama", data[0].nama);
    localStorage.setItem("latUser", data[0].lat);
    localStorage.setItem("longUser", data[0].long);
    localStorage.setItem("polsekId", data[0].PolsekID);
    window.location.href = "/Dashboard";
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/Dashboard">
            <b>Hallo</b>Police
          </a>
        </div>
        {/* login-logo  */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              <h5>Login</h5>
            </p>
            {cek ? (
              <div className="alert alert-warning alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <i className="icon fas fa-ban" /> {status}
              </div>
            ) : null}
            <form>
              <div className="input-group mb-3">
                <input
                  onChange={(data) => {
                    setEmail(data.target.value);
                  }}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(data) => {
                    setPassword(data.target.value);
                  }}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    onClick={() => {
                      LoginAdmin();
                    }}
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
                {/* .col */}
              </div>
            </form>
            {/* .social-auth-links */}
          </div>
          {/* login-card-body */}
        </div>
      </div>
    </div>
  );
};

export default Login;
