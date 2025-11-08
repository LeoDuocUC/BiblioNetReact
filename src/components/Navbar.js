// src/components/Navbar.js
import React from 'react';
// RENAME THE IMPORTED 'Navbar'
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Keep your function name the same, as App.js expects it
export default function Navbar() { 
  return (
    // Use the new name 'BootstrapNavbar'
    <BootstrapNavbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm main-navbar">
      <Container>
        {/* Mobile hamburger menu button */}
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        
        {/* Collapsible content */}
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            {/* "Inicio" link */}
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            {/* "Categorías" Dropdown */}
            <NavDropdown title="Categorías" id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/ficcion">Ficción</NavDropdown.Item>
              {/* --- THIS LINE IS NOW FIXED --- */}
              <NavDropdown.Item as={NavLink} to="/no-ficcion">No Ficción</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ciencia-tecnologia">Ciencia y Tecnología</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/arte-cultura">Arte y Cultura</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/negocios-economia">Negocios y Economía</NavDropdown.Item>
            </NavDropdown>

            {/* Other main links */}
            <Nav.Link as={NavLink} to="/libros">Libros</Nav.Link>
            <Nav.Link as={NavLink} to="/infantil-juvenil">Infantil y Juvenil</Nav.Link>
            
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar> 
  );
}