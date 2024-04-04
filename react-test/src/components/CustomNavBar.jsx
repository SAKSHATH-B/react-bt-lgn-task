import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const CustomNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      setUser(() => JSON.parse(sessionStorage.getItem("userDetails")));
      // console.log(JSON.parse(sessionStorage.getItem("userDetails")));
      setLogin(true);
    }
    if (sessionStorage.getItem("loggedIn")) {
      setLogin(true);
    }
  }, [login]);

  const logout = () => {
    setLogin(false);
    // sessionStorage.removeItem("userDetails");
    sessionStorage.clear();
    console.log("hello");
    window.location.href = "/";
  };

  return (
    <>
      <Navbar dark expand="md" className="p-0 bg-black">
        <NavbarBrand tag={ReactLink} to="/">
          <h2>CGG</h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink}>
                    <span className="text-uppercase text-white   ">
                      {user
                        ? user.userName
                        : sessionStorage.getItem("user_Name")}
                      &nbsp;
                    </span>
                    <i className="fa-solid fa-circle-user fa-xl     "></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    onClick={logout}
                    className="text-uppercase text-white   "
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Login">
                    LOGIN
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Signup">
                    SIGNUP
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default CustomNavBar;
