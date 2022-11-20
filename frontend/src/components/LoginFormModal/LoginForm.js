// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginFormModal.css";

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    )
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>Username or Email</label>
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="login-buttons">
        <button className="button" type="submit">
          Log In
        </button>
        <button className="button" onClick={demoUser}>
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
