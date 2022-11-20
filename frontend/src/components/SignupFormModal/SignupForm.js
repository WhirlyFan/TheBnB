// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupFormModal.css";

function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // const validate = () => {
  //   setErrors([])
  //   const newErrors = [];
  //   if (firstName.length > 20 || firstName.length < 3) {
  //     newErrors.push("First name must be 3-20 characters long.");
  //   }
  //   if (lastName.length > 20 || lastName.length < 3) {
  //     newErrors.push("Last name must be 3-20 characters long.");
  //   }
  //   if (password !== confirmPassword) {
  //     newErrors.push(
  //       "Confirm Password field must be the same as the Password field."
  //     );
  //   }
  //   setErrors(newErrors);
  //   if (errors.length) return true;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let errorHandler = validate();
    // if (errorHandler) return console.log('pass');
    // return console.log('fail')
    return dispatch(
      sessionActions.signup({
        firstName,
        lastName,
        email,
        username,
        password,
      })
    )
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="button" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormPage;
