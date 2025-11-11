// src/components/Navbar.js
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navbar() { 
  return (
    <BootstrapNavbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm main-navbar">
      {/* 1. Reverted back to regular 'Container' */}
      <Container>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          {/* 2. Reverted back to 'me-auto' to align links left */}
          <Nav className="me-auto">
            
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/libros" className="nav-link-custom">
              Libros
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/infantil-juvenil" className="nav-link-custom">
              Infantil y Juvenil
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/ciencia-tecnologia" className="nav-link-custom">
              Ciencia y Tecnología
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/no-ficcion" className="nav-link-custom">
              No Ficción
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/negocios-economia" className="nav-link-custom">
              Negocios y Economía
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/arte-cultura" className="nav-link-custom">
              Arte y Cultura
            </Nav.Link>
            
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar> 
  );
}