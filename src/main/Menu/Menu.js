import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/auth"


 
export default class Menu extends Component {

  render() {
    return (
 
      <nav className="sticky-top  navbar-dark bg-dark" style={{width: "100%", height: "40px", display: "flex", justifyContent: "center"}}>

        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}}     className="nav-link bg-dark"to="/">  <i className="fa fa-fw fa-home" ></i></Link>
        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}}     className="nav-link bg-dark"to="/homeuser">  <i className="fas fa-user-cog" ></i></Link>
        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}}     className="nav-link bg-dark"to="/listagemucs">  <i className="far fa-folder-open" ></i></Link>
        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}}     className="nav-link bg-dark"to="/files">  <i className="fa fa-archive" ></i></Link>
        { isAuthenticated() ? 
        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}} onClick={e => logout()} type="button" className="nav-link bg-dark" to="/"> Sair</Link> 
        :
        <Link style={{minWidth: "75px", maxWidth: "400px", width: "400px"}} className="nav-link bg-dark"to="/login"><i className="fa fa-user" ></i></Link>  
        }

      </nav>
    );
  }
}


