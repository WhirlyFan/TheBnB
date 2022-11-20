// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
// import SignupFormModal from "../SignupFormModal";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormModal/SignupForm";
import logoUrl from "./logo.png";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  const createSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/new`);
  };

  return (
    <>
      <ul className="navigation">
        <li className="header">
          <NavLink exact to="/">
            <img className={"logo"} src={logoUrl} alt={"logo"}></img>
          </NavLink>
        </li>
        <div className="header-right">
          {user && (
            <li>
              <button className="create-spot" onClick={createSpot}>
                Bnb your home
              </button>
            </li>
          )}
          {isLoaded && (
            <ProfileButton
              user={user}
              setLogin={setLogin}
              setShowModal={setShowModal}
            />
          )}
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {login ? (
              <LoginForm setShowModal={setShowModal} />
            ) : (
              <SignupFormPage setShowModal={setShowModal} />
            )}
          </Modal>
        )}
      </ul>
      <hr className={"page-break"}></hr>
    </>
  );
}

export default Navigation;
