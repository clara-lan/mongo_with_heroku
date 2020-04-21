import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function Header() {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand >Emaily</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Login With Google</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}




export default Header;