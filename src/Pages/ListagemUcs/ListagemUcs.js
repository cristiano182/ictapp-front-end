import React, { Component } from "react";
import {api} from "../../services/api"

export default class ListagemUcs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: []
    };
  }

  componentDidMount() {
    api
    .get("/dados/")
      .then(response => response.data )
      .then(dado => this.setState({ dados: dado }));
  }

  render() {
    return (
      <div
        className="container"
        style={{ paddingTop: "5px", width: "100%" }}
      >
        <nav
          aria-label="breadcrumb "
          style={{ width: "100%", paddingLeft: "5px" }}
        >
          <ol className="breadcrumb " style={{ marginBottom: "1px" }}>
            <li className="breadcrumb-item active" aria-current="page">
              Disciplinas vigentes ICT-UNIFESP e suas respectivas
              informações/pré-requisitos
            </li>
          </ol>
        </nav>

        <div className="row" style={{ width: "100%" }}>
          {this.state.dados.map(dado => {
            var aux = "Não há";
            if (dado.requirement !== "0") aux = dado.requirement;
            return (
              <div
                key={dado._id}
                className="card text-white bg-dark mb-3"
                style={{
                  width: "21.875rem",
                  alignItems: "center",
                  margin: "5px"
                }}
              >
                <div
                  className="card-header"
                  style={{
                    paddingTop: "1px",
                    width: "100%",
                    paddingBottom: "2px",
                    color: "#dddd"
                  }}
                >
                  {" "}
                  <strong>{dado.name} </strong>
                </div>
                <div
                  className="card-body"
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingTop: "1px"
                  }}
                >
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>Pré-requisito: &nbsp; {aux} </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>Carga Horária: &nbsp;{dado.work_load}H</small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Eletiva - Ciência da Computação: &nbsp;
                      {dado.elective_BCC ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Interdisciplinar - Ciência e Tecnologia: &nbsp;
                      {dado.interdiciplinary_BCT ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Ciência e Tecnologia: &nbsp;
                      {dado.required_BCT ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Engenharia da Computação: &nbsp;
                      {dado.required_EC ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Biotecnologia: &nbsp;
                      {dado.required_BBT ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Ciência da Computação: &nbsp;
                      {dado.required_BCC ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Engenharia de Materiais: &nbsp;
                      {dado.required_EM ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Engenharia Biomedica: &nbsp;
                      {dado.required_EB ? "Sim" : "Não"}
                    </small>
                  </p>
                  <p style={{ margin: "1px" }}>
                    {" "}
                    <small>
                      UC Obrigatoria - Matematica Computacional: &nbsp;
                      {dado.required_BMC ? "Sim" : "Não"}
                    </small>
                  </p>
                </div>
                <a
                  href={dado.pdf}
                  target="_blank"
                  without rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginBottom: "4px" }}
                >
                  Consultar Ementa
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
