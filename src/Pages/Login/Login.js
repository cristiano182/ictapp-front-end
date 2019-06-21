import React, { Component } from "react";
import { Link, browserHistory } from "react-router-dom";
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
    
    const  userID  = 2620607431313980

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
          <div
            style={{ padding: "0px" }}
            className="alert alert-danger"
            role="alert"
          >
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
       

      <button onClick={this.responseFacebook}> Entrar </button>

          <hr />
          <p style={{ color: "#ddd", fontSize: "10px" }}>
            Você não tem uma conta?
          </p>

          <FacebookLogin
            appId="331309754176413"
            disableMobileRedirect={true}
            fields="name,email,picture"
            callback={e =>
              this.props.history.push({
                pathname: "/registrar",
                state: e
              })
            }
            render={renderProps => (
              <button
                style={{ padding: "0px" }}
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
