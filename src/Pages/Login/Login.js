import React, { Component } from "react";
import { Link, browserHistory} from "react-router-dom";
import { login } from "../../services/auth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { api } from "../../services/api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }
  componentDidMount() {}

  responseFacebook = async res => {
    const { userID } = res;
    alert(JSON.stringify(res))
    if (userID) {
      try {
        const user = await api.post("/users/login/", { userID });
        if (!user.data) {
          this.setState({
            error: "Usuario nao cadastrado, Por favor Registre-se"
          });
        } else {
          login(user.data);
          this.props.history.push("/");

          /*
          return (
            <Redirect to="/login" />
          )*/
        }
      } catch (err) {
        this.setState({ error: err });
      }
    } else {
      console.log("facebook não retornou");
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <div style={{padding: '0px'}} className="alert alert-danger" role="alert">
            {" "}
            {this.state.error}{" "}
          </div>
        )}

        <div
          className="container bg-dark"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            minWidth: "50px",
            maxWidth: "400px",
            width: "100%"
          }}
        >
          <label style={{ color: "#ddd" }}>
            <strong>Login</strong>
          </label>
          <br />
          {/*
        <form onSubmit={this.onSubmitLogar}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail" style={{ color: "#dddd" }}>
                Email
              </label>
              <input
                autoFocus="true"
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Insira seu email"
                onChange={ e => this.setState({email: e.target.value})}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword" style={{ color: "#dddd" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Insira seu Password"
                onChange={ e => this.setState({password: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ paddingTop: "1px", marginTop: "4px" }}
          >
            Entrar
          </button>
        </form>
        <hr />

           <button className="btn btn-lg btn-danger btn-block " type="submit">
          {" "}
          <i className="fab fa-google mr-2" /> <small> Entre com Google </small>{" "}
      </button> */}

          <FacebookLogin
            appId="331309754176413"
            fields="name,email,picture"
            callback={e => this.responseFacebook(e)}
           // responseType={'none'}
           // state={null}
           // isMobile
            //redirectUri={window.location.href ('https://ictapp.net')}
            render={renderProps => (
              <button
              style={{padding: '0px'}}
                className="btn btn-lg btn-primary btn-block "
                onClick={renderProps.onClick}
              >
                <i className="fab fa-facebook-f mr-2" />
                <small>Entrar</small>
              </button>
            )}
          />

          <hr />
          <p style={{ color: "#dddd" , fontSize: '10px'}}>Você não tem uma conta?</p>

          <FacebookLogin
           // responseType={'none'}
           // state={null}
              appId="331309754176413"
             // isMobile
              fields="name,email,picture"
              callback={e =>  this.props.history.push({
                pathname: "/registrar",
                state: e
              })}
              render={renderProps => (
                <button
                style={{padding: '0px'}}
                  className="btn btn-lg btn-primary btn-block "
                  onClick={renderProps.onClick}
                >
                  <i className="fab fa-facebook-f mr-2" />
                  <small>Registre-se com Facebook</small>
                </button>
              )}
            />


        </div>
      </div>
    );
  }
}
