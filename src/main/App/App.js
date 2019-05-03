import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/auth"
import Routes from "../Routes/Routes";
import ictapp from "../../images/ictapp.png"
import { NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <div className="App">


        <Navbar sticky="top" style={{ background: 'linear-gradient(to left, #4A00E0, #8E2DE2)' }} expand="lg">

        <Link 
        style={{
          marginLeft: '100px',
          backgroundImage: 'url(' + ictapp + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
           width: '50px', height: '50px'}} to="/"> </Link>
    {  /* <Navbar.Brand href="/" style={{ marginLeft: '100px' }}>React-Bootstrap</Navbar.Brand> */ }

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline style={{ marginRight: '100px' }}>
              <Nav.Link style={{ color: 'white', fontSize: '13px', padding: '0px', margin: '0px', textDecoration: 'none', width: "200px" }} href="/homeuser"><strong>Painel Usuario </strong></Nav.Link>
              <Nav.Link style={{ color: 'white', fontSize: '13px', padding: '0px', margin: '0px', textDecoration: 'none', width: "200px" }} href="/listagemucs"><strong>Lista Disciplinas</strong></Nav.Link>
              <Nav.Link style={{ color: 'white', fontSize: '13px', padding: '0px', margin: '0px', textDecoration: 'none', width: "200px" }} href="/files"><strong>Arquivos Google Drive</strong></Nav.Link>

              {isAuthenticated() ?
                <Nav.Link style={{ color: 'white', fontSize: '13px', padding: '0px', margin: '0px', textDecoration: 'none', width: "200px" }} href="/" onClick={e => logout()}><strong>Sair</strong></Nav.Link>
                :
                <Nav.Link style={{ color: 'white', fontSize: '13px', padding: '0px', margin: '0px', textDecoration: 'none', width: "200px" }} href="/login"><strong>Login</strong></Nav.Link>
              }

            </Form>
          </Navbar.Collapse>
        </Navbar>








        { /*
        <nav className="sticky-top" style={{ width: "100%", height: "40px", paddingTop: '20px',paddingBottom: '10px',display: "flex", justifyContent: 'flex-end', height: "100%" }}>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/"> <strong> Home</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/homeuser"> <strong> Painel Usuario</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/listagemucs"> <strong>Lista Disciplinas</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/files"> <strong>Arquivos Google Drive</strong></Link>
          {isAuthenticated() ?
            <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} onClick={e => logout()} type="button" className="" to="/"> <strong>Sair</strong></Link>
            :
            <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/login"> <strong>Login</strong></Link>
          }
        </nav>
        */}

        <Routes />

      </div>

    );
  }
}
