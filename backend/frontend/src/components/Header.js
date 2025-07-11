import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from '../components/SearchBox'

function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHander = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    
      <Navbar expand="lg" className="bg-dark navbar-dark" collapseOnSelect>
      <Container>
        <Nav.Link as={Link} to='/'>
          <Navbar.Brand>Dang's Shop</Navbar.Brand>
          </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/cart'><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username' className='me-2'>
                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHander}>Logout</NavDropdown.Item>
              </NavDropdown>
            ):(
              <Nav.Link as={Link} to='/login'><i className='fas fa-user'></i>Login</Nav.Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu' >
                <NavDropdown.Item as={Link} to='/admin/userlist'>Users</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>
              </NavDropdown>
            )}
              
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
    
  
}

export default Header
