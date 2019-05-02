import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/auth"

import Routes from "../Routes/Routes";


export default class App extends Component {
  render() {
    return (
      <div className="App">

        <nav className="sticky-top" style={{ width: "100%", height: "40px", paddingTop: '20px',paddingBottom: '10px',display: "flex", justifyContent: 'flex-end', height: "100%" }}>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/"> <strong> Home</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/homeuser"> <strong> Area do Usuario</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/listagemucs"> <strong>Lista Disciplinas</strong></Link>
          <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/files"> <strong>Arquivos Google Drive</strong></Link>
          {isAuthenticated() ?
            <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} onClick={e => logout()} type="button" className="" to="/"> <strong>Sair</strong></Link>
            :
            <Link style={{ color: '#ddd', fontSize: '13px',padding: '0px',margin: '0px' ,textDecoration: 'none', width: "200px" }} className="" to="/login"> <strong>Login</strong></Link>
          }
        </nav>


        <Routes />

      </div>

    );
  }
}
