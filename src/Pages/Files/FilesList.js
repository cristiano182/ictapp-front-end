import React, { Component } from "react";
import { api, apiGoogleDrive } from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import styles from "./FilesList.css";

export default class FilesList extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClickLoad = this.onClickLoad.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.state = {
      error: "",
      arquivos: [],
      skip: 0,
      user: []
    };
  }
  async componentDidMount() {
    let skip = 0;
    await api
      .get("/files/" + skip.toString())
      .then(res => res.data)
      .then(files => this.setState({ arquivos: files }))
      .catch(err => console.log(err));
    this.setState({ skip: 0 });

    if (isAuthenticated()) {
      await api
        .get("/users/")
        .then(res => res.data)
        .then(u => this.setState({ user: u }))
        .catch(err => console.log(err + "erro ao carregar usuario"));
    }
  }

  onClickLoad = async e => {
    await this.setState({ skip: this.state.skip + 20 });
    await api
      .get("/files/" + this.state.skip.toString())
      .then(res => res.data)
      .then(files => {
        this.setState({ arquivos: this.state.arquivos.concat(files) });
      });
  };

  async onClickDelete(uc_id, info_id, info_link) {
    if (isAuthenticated()) {
      const obj = {
        uc_id: uc_id,
        info_id: info_id
      };
      await api.post("/files/delete/", obj).catch(err => console.log(err));

      await apiGoogleDrive.delete(
        "https://www.googleapis.com/drive/v3/files/" + info_link
      );

      this.componentDidMount();
    }
  }

  onClick(_id, name_uc) {
    if (isAuthenticated()) {
      this.props.history.push({
        pathname: "/files/add",
        state: { details: _id, name: name_uc }
      });
    } else {
      window.scrollTo(0, 0);
      this.setState({
        error: "Voce presisa estar logado para enviar um arquivo."
      });
    }
  }
  render() {
    return (
      <div className="container" style={styles.container}>
        {this.state.error && (
          <div
            style={{ fontSize: "12px" }}
            className="alert alert-danger"
            role="alert"
          >
            {" "}
            {this.state.error}{" "}
          </div>
        )}
        {this.state.arquivos.map(arquivo => {
          return (
            <div key={arquivo._id} className="" style={{ marginBottom: "3px" }}>
              <hr className="hr" style={styles.hr} />
              <label
                className="btn-primary"
                style={{ padding: "2px", color: "#ddd", borderRadius: "10px" }}
                data-toggle="collapse"
                data-target={"#" + arquivo._id}
                aria-controls="collapseExample"
                data-whatever="@getbootstrap"
                aria-expanded="false"
              >
                <strong>{arquivo.name}</strong>
              </label>
              <div
                className="collapse"
                style={{ width: "100%" }}
                id={arquivo._id}
              >
                <div className="row " style={styles.row}>
                  {arquivo.info.map(infos => {
                    return (
                      <div
                        key={infos._id}
                        className="card text-white"
                        style={styles.card}
                      >
                        <div
                          className="card-header"
                          style={{
                            color: "#FF7F50",
                            fontSize: "13px",
                            padding: "0px"
                          }}
                        >
                          <a
                            className="nav-link"
                            style={{ color: "orange" }}
                            href={
                              "https://drive.google.com/drive/folders/" +
                              infos.link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            Ver Arquivo{" "}
                          </a>
                        </div>
                        <div className="card-body " style={{ padding: "0px" }}>
                          {infos.descricao} <br />
                          <small style={{ fontSize: "10px" }}>
                            {" "}
                            Adicionado Por: {infos.autor}{" "}
                            <img
                              src={
                                infos.foto
                                  ? infos.foto
                                  : "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg"
                              }
                              className="mr-3"
                              alt="..."
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "200px",
                                padding: "0px"
                              }}
                            />
                            {this.state.user.role === 1 ? (
                              <button
                                className="btn btn-danger"
                                style={{ padding: "0px", fontSize: "10px" }}
                                onClick={e =>
                                  this.onClickDelete(
                                    arquivo._id,
                                    infos._id,
                                    infos.link
                                  )
                                }
                              >
                                {" "}
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={e => this.onClick(arquivo._id, arquivo.name)}
                  className="btn-success"
                  style={{ padding: "0px", borderRadius: "10px", marginTop: '5px' }}
                >
                  Adicionar novo arquivo &nbsp;
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="btn btn-success"
          onClick={this.onClickLoad}
          style={{ margin: "10px", padding: "0px" }}
        >
          {" "}
          Carregar mais... ({this.state.arquivos.length}/243)
        </button>
      </div>
    );
  }
}
