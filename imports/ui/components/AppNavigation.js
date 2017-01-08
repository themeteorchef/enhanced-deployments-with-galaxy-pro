import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AppNavigation = ({ hasUser }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <img src="/logo.svg" alt="I Love Meteor" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/latest">
          <NavItem eventKey={ 1 } href="/latest">The Latest</NavItem>
        </LinkContainer>
        <LinkContainer to="/popular">
          <NavItem eventKey={ 1 } href="/popular">Popular</NavItem>
        </LinkContainer>
        { hasUser ? <LinkContainer to="/favorites">
          <NavItem eventKey={ 2 } href="/favorites">Favorites</NavItem>
        </LinkContainer> : '' }
        { hasUser ? <LinkContainer to="/submissions">
          <NavItem eventKey={ 2 } href="/submissions">Submissions</NavItem>
        </LinkContainer> : '' }
      </Nav>
      { !hasUser ? <Nav pullRight>
        <LinkContainer to="signup">
          <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="login">
          <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
        </LinkContainer>
      </Nav> : <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav> }
    </Navbar.Collapse>
  </Navbar>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
