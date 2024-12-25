import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

function Header() {
  return (
    
      <Navbar expand="lg" className="bg-dark navbar-dark" collapseOnSelect>
      <Container>
        <Nav.Link as={Link} to='/'>
          <Navbar.Brand>Dang's Shop</Navbar.Brand>
          </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/cart'><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            <Nav.Link as={Link} to='/login'><i className='fas fa-user'></i>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
    
  
}

export default Header
