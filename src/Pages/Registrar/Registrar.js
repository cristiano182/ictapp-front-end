import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { api } from "../../services/api";

export default class Registrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      curso: ""
    };
  }

  responseFacebook = async res => {
    const { email, name } = res;
    const userID = res.userID;
    const foto = res.picture.data.url;
    if (!this.state.curso) {
      this.setState({ error: "Por favor informe o seu curso." });
    } else {
      try {
        let curso;
        let cargaHoraria;
        let cursoName;
        let cargaHorariaComplementar;
        if (this.state.curso === "ENGENHARIA BIOMEDICA") {
          curso = "required_EB";
          cargaHoraria = 2628;
          cursoName = "Engenharia Biomedica";
          cargaHorariaComplementar = 108;
        } else if (
          this.state.curso === "INTERDISCIPLINAR CIÊNCIA E TECNOLOGIA"
        ) {
          curso = "required_BCT";
          cargaHoraria = 468;
          cursoName = "Interdisciplinar Ciência e Tecnologia";
          cargaHorariaComplementar = 420;
        } else if (this.state.curso === "BACHARELADO BIOTECNOLOGIA") {
          curso = "required_BBT";
          cursoName = "Bacharelado Biotecnologia";
          cargaHoraria = 2196;
          cargaHorariaComplementar = 108;
        } else if (this.state.curso === "BACHARELADO CIÊNCIA DA COMPUTAÇÃO") {
          curso = "required_BCC";
          cursoName = "Bacharelado Ciência da Computação";
          cargaHoraria = 2196;
          cargaHorariaComplementar = 144;
        } else if (
          this.state.curso === "BACHARELADO MATEMATICA COMPUTACIONAL"
        ) {
          curso = "required_BMC";
          cursoName = "Bacharelado Matematica Computacional";
          cargaHoraria = 2196;
          cargaHorariaComplementar = 72;
        } else if (this.state.curso === "ENGENHARIA DE MATERIAIS") {
          curso = "required_EM";
          cursoName = "Engenharia de Materiais";
          cargaHoraria = 3204;
          cargaHorariaComplementar = 108;
        } else if (this.state.curso === "ENGENHARIA DA COMPUTAÇÃO") {
          curso = "required_EC";
          cursoName = "Engenharia de Computação";
          cargaHoraria = 3096;
          cargaHorariaComplementar = 108;
        }

        await api
          .post("/users/", {
            email,
            name,
            userID,
            foto,
            curso,
            cargaHoraria,
            cargaHorariaComplementar,
            cursoName
          })
          .catch(err => console.log(err));
          this.props.history.push('/login')
      } catch (err) {
        this.setState({ error: "Erro ao tentar registrar" + err });
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.error && (
          <div className="alert alert-danger" role="alert">
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
            display: "flex",
            justifyContent: "center",
            minWidth: "50px",
            maxWidth: "400px",
            width: "100%"
          }}
        >
          <div>
            {/*
            <div class="form-group">
              <label for="inputEmail" style={{ color: "#dddd" }}>
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                placeholder="Insira seu email"
                onChange={e => this.setState({email: e.target.value})}
              />
            </div>     
        */}
            <label htmlFor="inputCurso" style={{ color: "#dddd" }}>
              Curso
            </label>
            <select
              id="inputState"
              className="form-control"
              onChange={e => this.setState({ curso: e.target.value })}
            >
              <option selected> INFORME SEU CURSO</option>
              <option>INTERDISCIPLINAR CIÊNCIA E TECNOLOGIA</option>
              <option>BACHARELADO BIOTECNOLOGIA</option>
              <option>BACHARELADO CIÊNCIA DA COMPUTAÇÃO</option>
              <option>BACHARELADO MATEMATICA COMPUTACIONAL</option>
              <option>ENGENHARIA DE MATERIAIS</option>
              <option>ENGENHARIA DA COMPUTAÇÃO</option>
              <option>ENGENHARIA BIOMEDICA</option>
            </select>
            <hr />
            {/* <Link
          style={{}}
          className="btn btn-lg btn-danger btn-block"
          to="/registrar"
        >
          <i className="fab fa-google mr-2" />
          <small>Registre-se com Google</small>
           </Link> */}

            <FacebookLogin
              appId="331309754176413"
              fields="name,email,picture"
              callback={e => this.responseFacebook(e)}
              render={renderProps => (
                <button
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
      </div>
    );
  }
}
