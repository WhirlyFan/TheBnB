// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
// import SignupFormModal from "../SignupFormModal";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormModal/SignupForm";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = <ProfileButton user={sessionUser} />;
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        )}
      </li>
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
  );
}

export default Navigation;
