import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar dark expand="md" className="p-0 bg-black">
        <NavbarBrand tag={ReactLink} to="/">
          <h2>CGG</h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <>
              <NavItem>
                <NavLink tag={ReactLink} className="text-white " to="/sample">
                  SAMPLE
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} className="text-white " to="/login">
                  LOGIN
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} className="text-white " to="/signup">
                  SIGNUP
                </NavLink>
              </NavItem>
            </>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
