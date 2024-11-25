/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import '../app/globals.css';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto justify-content-start">
            <Nav.Link id="about-stuff-nav" href="#about" key="about" active={pathName === '/about'}>
              About
            </Nav.Link>
            <Nav.Link id="tutorial-stuff-nav" href="#tutorial" key="tutorial" active={pathName === '/tutorial'}>
              Tutorial
            </Nav.Link>
            {currentUser
              ? [
                  <Nav.Link id="sessions-nav" href="/sessions" key="sessions" active={pathName === '/add'}>
                    Sessions
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                    List Stuff
                  </Nav.Link>,
                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="ml-auto">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
