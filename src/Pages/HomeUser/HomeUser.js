import React, { Component } from "react";
import { api } from "../../services/api";
import { ProgressBar, Modal } from "react-bootstrap";
import { verifyToken, logout } from "../../services/auth";
import {
  Card,
  Card2,
  Container,
  CardHeader,
  CardBody,
  CardBody2,
  CardHeader2,
  Button
} from "./styles";

export default class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      user: [],
      disciplinasCursadas: [],
      msgAdd: "",
      msgRemove: "",
      show: false,
      newCurso: "",
      horasComplementares: ""
    };
  }

  async componentWillUnmount() {
    const obj = {
      disciplinasCursadas: this.state.disciplinasCursadas,
      horas: this.state.user.horas,
      horasComplementares: this.state.horasComplementares
    };

    if (this.state.user.userID)
      await api.put("/users/updatedata/", obj).catch(erro => console.log(erro));
    this.setState({ dados: [] });
  }

  async componentDidMount() {
    await api
      .get("/dados/")
      .then(response => response.data)
      .then(dado => this.setState({ dados: dado }));

    if (await verifyToken()) {
      await api
        .get("/users/")
        .then(res => res.data)
        .then(u => this.setState({ user: u }))
        .catch(err => console.log(err + "erro ao carregar usuario"));
      this.setState({
        horasComplementares: this.state.user.horasComplementares
      });
      this.setState({
        disciplinasCursadas: this.state.user.disciplinasCursadas
      });
    } else {
      logout();
      this.props.history.push("/login");
    }
  }

  onClickRemover = async e => {
    window.scrollTo(0, 0);
    this.setState({
      msgAdd: "",
      msgRemove: "Você removeu uma disciplina."
    });

    this.state.user.horas = this.state.user.horas - e.work_load;

    this.setState({
      disciplinasCursadas: await this.state.disciplinasCursadas.filter(
        obj => obj.name !== e.name
      )
    });
  };

  handleCurso = async e => {
    const newCurso = this.state.newCurso;
    const obj = {
      newCurso
    };
    await api.put("/users/updatecurso/", obj).catch(erro => console.log(erro));

    this.setState({ show: false });

    this.componentDidMount();
  };

  onClickAdicionar = async e => {
    const tamanhoAntes = this.state.disciplinasCursadas.length;

    this.setState({
      disciplinasCursadas: await this.state.disciplinasCursadas.filter(
        obj => obj.name !== e.name
      )
    });

    this.setState({
      disciplinasCursadas: await this.state.disciplinasCursadas.concat([
        { name: e.name, work_load: e.work_load }
      ])
    });

    const novoTamanho = this.state.disciplinasCursadas.length;

    if (tamanhoAntes !== novoTamanho)
      this.state.user.horas = this.state.user.horas + e.work_load;

    window.scrollTo(0, 0);
    this.setState({
      msgRemove: "",
      msgAdd: "Você adicionou uma disciplina."
    });
  };

  render() {
    return (
      <Container>
        <Card>
          {this.state.msgRemove && (
            <div
              style={{ fontSize: "12px" }}
              className="alert alert-danger"
              role="alert"
            >
              {" "}
              {this.state.msgRemove}{" "}
            </div>
          )}
          {this.state.msgAdd && (
            <div
              style={{ fontSize: "12px" }}
              className="alert alert-success"
              role="alert"
            >
              {" "}
              {this.state.msgAdd}{" "}
            </div>
          )}
          <CardHeader>
            <strong> Informações e Graficos</strong>
          </CardHeader>
          <CardBody>
            <div className="media" style={{ width: "300px" }}>
              <img
                src={this.state.user.foto}
                style={{ width: "50px", borderRadius: "100px" }}
                className="align-self-end mr-3"
                alt="..."
              />
              <div className="media-body">
                <p style={{ marginTop: "20px" }}>
                  Olá, {this.state.user.name}{" "}
                </p>
              </div>
            </div>
            <br />

            <Modal show={this.state.show}>
              <Modal.Body>
                <select
                  id="inputState"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  onChange={e => this.setState({ newCurso: e.target.value })}
                >
                  <option selected>NOVO CURSO</option>
                  <option>INTERDISCIPLINAR CIÊNCIA E TECNOLOGIA</option>
                  <option>BACHARELADO BIOTECNOLOGIA</option>
                  <option>BACHARELADO CIÊNCIA DA COMPUTAÇÃO</option>
                  <option>BACHARELADO MATEMATICA COMPUTACIONAL</option>
                  <option>ENGENHARIA DE MATERIAIS</option>
                  <option>ENGENHARIA DA COMPUTAÇÃO</option>
                  <option>ENGENHARIA BIOMEDICA</option>
                </select>
              </Modal.Body>

              <Modal.Footer style={{ height: "40px" }}>
                <button
                  onClick={e => this.setState({ show: false })}
                  className="btn btn-danger"
                >
                  Fechar
                </button>
                <button onClick={this.handleCurso} className="btn btn-success">
                  Salvar
                </button>
              </Modal.Footer>
            </Modal>

            <label
              className="btn btn-info"
              onClick={e => this.setState({ show: true })}
              style={{ fontSize: "13px" }}
            >
              {" "}
              <small>Curso: {this.state.user.cursoName}</small>
            </label>

            <div style={{ marginTop: "30px" }}>
              <label style={{ color: "#dddd" }}>
                <strong style={{ fontSize: "12px" }}>
                  {this.state.user.horas} horas em UC'S OBRIGATORIAS de um total
                  de {this.state.user.cargaHoraria}
                </strong>
              </label>
              <ProgressBar
                now={parseInt(
                  Math.round(
                    (this.state.user.horas * 100) / this.state.user.cargaHoraria
                  )
                )}
                label={`${parseInt(
                  Math.round(
                    (this.state.user.horas * 100) / this.state.user.cargaHoraria
                  )
                )}%`}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label style={{ color: "#dddd" }}>
                <strong style={{ fontSize: "12px" }}>
                  {this.state.horasComplementares} horas em ATIVIDADES
                  COMPLEMENTARES de um total de &nbsp;
                  {this.state.user.cargaHorariaComplementar}{" "}
                  <button
                    onClick={e =>
                      this.state.horasComplementares <
                      this.state.user.cargaHorariaComplementar
                        ? this.setState({
                            horasComplementares:
                              this.state.horasComplementares + 1
                          })
                        : ""
                    }
                    style={{ padding: "0px", width: "30px" }}
                    className="btn btn-success"
                  >
                    +
                  </button>{" "}
                  <button
                    onClick={e =>
                      this.state.horasComplementares > 0
                        ? this.setState({
                            horasComplementares:
                              this.state.horasComplementares - 1
                          })
                        : ""
                    }
                    style={{ padding: "0px", width: "30px" }}
                    className="btn btn-warning"
                  >
                    -
                  </button>
                </strong>
              </label>
              <ProgressBar
                variant="success"
                now={parseInt(
                  Math.round(
                    (this.state.horasComplementares * 100) /
                      this.state.user.cargaHorariaComplementar
                  )
                )}
                label={`${parseInt(
                  Math.round(
                    (this.state.horasComplementares * 100) /
                      this.state.user.cargaHorariaComplementar
                  )
                )}%`}
              />
            </div>
          </CardBody>
        </Card>

        <Card2>
          <CardHeader2>
            <strong> Disciplinas já cursadas</strong>
          </CardHeader2>
          <CardBody2>
            {this.state.disciplinasCursadas.map(p => {
              return (
                <div key={p.name} style={{ margin: "1px" }}>
                  <small>
                    <Button onClick={e => this.onClickRemover(p)}>
                      <small style={{ color: "blue" }}>-</small> {p.name}
                    </Button>
                  </small>
                </div>
              );
            })}
          </CardBody2>
        </Card2>

        <Card2>
          <CardHeader2>
            <strong>Disciplinas Obrigatorias do seu curso</strong>
          </CardHeader2>
          <CardBody2>
            {this.state.dados.map(dado => {
              if (dado[this.state.user.curso])
                return (
                  <div key={dado._id} style={{ margin: "1px" }}>
                    <small>
                      <Button onClick={e => this.onClickAdicionar(dado)}>
                        <small style={{ color: "blue" }}>-</small> {dado.name}
                      </Button>
                    </small>
                  </div>
                );
            })}
          </CardBody2>
        </Card2>

        <Card2>
          <CardHeader2>
            <strong>Disciplinas Interdisciplinares BCT</strong>{" "}
          </CardHeader2>
          <CardBody2>
            {this.state.dados.map(dado => {
              if (dado.interdiciplinary_BCT)
                return (
                  <p key={dado._id} style={{ margin: "1px" }}>
                    <small> - {dado.name}</small>
                  </p>
                );
            })}
          </CardBody2>
        </Card2>
      </Container>
    );
  }
}
