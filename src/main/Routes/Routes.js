import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

import Home from "../../Pages/Home/Home";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import Registrar from "../../Pages/Registrar/Registrar";
import Login from "../../Pages/Login/Login";
import HomeUser from "../../Pages/HomeUser/HomeUser";
import Files from "../../Pages/Files/FilesList";
import FilesAdd from "../../Pages/Files/FilesAdd";
import ListagemUcs from "../../Pages/ListagemUcs/ListagemUcs";


export default class Routes extends Component {
 render() {
     return (
      <main className="container">
        <Switch>
        <Route exact path="/" component={Home} />
          <Route path="/files/add"component={ isAuthenticated() ?  FilesAdd : Login}  />
          <Route  path="/homeuser"  component={ isAuthenticated() ?  HomeUser : Login}  />
          <Route path="/login" component={Login} />
          <Route path="/registrar" component={ Registrar}/>     
          <Route path="/listagemucs" component={ListagemUcs} /> 
          <Route exact path="/files" component={Files} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    );
  }
}
