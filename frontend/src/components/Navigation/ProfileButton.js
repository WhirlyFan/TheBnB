// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function ProfileButton({ user, setLogin, setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profile = (e) => {
    e.preventDefault();
    history.push(`/${user.username}/profile`);
  };

  return (
    <>
      <button id={"profile-button"} onClick={openMenu}>
        <i className="fas fa-bars" id="profile-hamburger" />
        <i className="fas fa-user" id={"profile-pic"} />
      </button>
      {showMenu &&
        (user ? (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <div className="button-div">
              <button className="button-dropdown" onClick={profile}>
                Profile
              </button>
              <button className="button-dropdown" onClick={logout}>
                Log Out
              </button>
            </div>
          </ul>
        ) : (
          <ul className="profile-dropdown">
            <div className="button-div">
              <button
                className="button-dropdown"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Log In
              </button>
              <button
                className="button-dropdown"
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </ul>
        ))}
    </>
  );
}

export default ProfileButton;
