import React, { Component } from "react";


export class PageNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    };
  }

  responseFacebook = e => {
    console.log(e);
  }

  render() {
    return (
      <div className='jumbotron '>
 
        <p>ERRO AO TENTAR CARREGAR A PAGINA , POR GENTILEZA REFAÇA SEU LOGIN</p>


      </div>
    );
  }
}

export default PageNotFound;
