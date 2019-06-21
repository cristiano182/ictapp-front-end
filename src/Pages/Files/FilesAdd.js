import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage, Container, FileInfo } from "./styles";
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";
import { api, apiGoogleDrive } from "../../services/api";
import { verifyToken, logout } from "../../services/auth";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { urlEncodedData, config } from "../../services/configJWTGoogle";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.onClickSendFiles = this.onClickSendFiles.bind(this);
    this.state = {
      uploadedFiles: [],
      descricao: "",
      user: [],
      error: "",
      pastaPublica: "1BMmVZwOAc7GVEGBGB1oxegy2O3tbNgh0",
      pastaFileCurrent: "",
      id_uc: "",
      name_uc: "",
      userSendFile: false
    };
  }
  async componentDidMount() {
    if (await verifyToken())
     await this.loadUser();
    else {
      logout();
      this.props.history.push("/login");
    }
    this.setState({
      id_uc: this.props.location.state.details,
      name_uc: this.props.location.state.name
    });
    await this.getTokenDrive();

    this.CreatePasteDrive();
  }
  async componentWillUnmount() {
    if (this.state.uploadedFiles.length <= 0 || !this.state.userSendFile) await this.deletePaste();
    
  }
  getTokenDrive = async e => {
    await axios
      .post(
        "https://www.googleapis.com/oauth2/v3/token",
        urlEncodedData,
        config
      )
      .then(p => localStorage.setItem("accessToken", p.data.access_token))
      .catch(erro => console.log(erro));
  };
  loadUser = async e => {
    await api
      .get("/users/")
      .then(res => res.data)
      .then(u => this.setState({ user: u }))
      .catch(err => console.log(err));
  };
  deletePaste = async e => {
    await apiGoogleDrive.delete(
      "https://www.googleapis.com/drive/v3/files/" + this.state.pastaFileCurrent
    );
    this.setState({ userSendFile: true });
    this.props.history.push("/");
  };
  onClickSendFiles = async e => {
    const infos = {
      autor: this.state.user.userID.toString(),
      link: this.state.pastaFileCurrent,
      descricao: this.state.descricao,
      
    };
    await api
      .put("/files/" + this.state.id_uc, infos)
      .catch(err => console.log(err));
    await api.put("/users/updaterank/").catch(err => console.log(err));
    this.setState({ userSendFile: true });
    this.props.history.push("/files");
  };
  CreatePasteDrive = async e => {
    var metadata = {
      name: this.state.user.userID,
      mimeType: "application/vnd.google-apps.folder",
      parents: [this.state.pastaPublica]
    };
    var form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
  console.log(form)
    await apiGoogleDrive
      .post("",)
      .then(res => this.setState({ pastaFileCurrent: res.data.id }))
      .catch(err => console.log(err));
  };
  onChangeDescricao = e => this.setState({ descricao: e.target.value });
  
  handleUpload = async files => {
    if (this.state.descricao.length < 15) {
      this.setState({
        error:
          "Você precisa inserir uma descrição antes de enviar arquivos. (min 15 caracteres)."
      });
    } else {
      const uploadedFiles = files.map(file => ({
        file: file,
        name: file.name,
        type: file.type,
        id: uniqueId(),
        readableSize: filesize(file.size),
        progress: 0,
        uploaded: false,
        error: false
      }));

      this.setState({
        uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
      });
      await uploadedFiles.forEach(this.processUpload);
      this.setState({ error: "" });
    }
  };
  processUpload =  uploadedFile => {
    var metadata = {
      name: uploadedFile.name,
      mimeType: uploadedFile.type,
      parents: [this.state.pastaFileCurrent]
    };

    var data = new FormData();

    data.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );

    data.append(
      "file",
      new Blob([uploadedFile.file]),

      uploadedFile.name
    );

    apiGoogleDrive
      .post("", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          this.updateFile(uploadedFile.id, { progress });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, { error: true });
      });
  };
  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };
  handleDelete = async id => {
   // await apiGoogleDrive.delete(
    //  `https://www.googleapis.com/drive/v3/files/${id}`
   // );

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };
  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive)
      return (
        <UploadMessage>
          Arraste ou click aqui para enviar arquivos
        </UploadMessage>
      );
    if (isDragReject)
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };
  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: "10px",
          width: "100%",
          maxWidth: "500px",
          height: "100%",
          minHeight: "500px",
          padding: "0px"
        }}
      >
        <label
          className="btn-primary"
          style={{ padding: "2px", color: "#ddd", borderRadius: "10px" }}
        >
          <strong style={{ padding: "2px", color: "#ddd" }}>
            {this.state.name_uc}
          </strong>
        </label>
        <br />

        <label style={{ color: "#ddd" }} className="">
          {this.state.error ? (
            <div
              style={{ fontSize: "12px" }}
              className="alert alert-danger"
              role="alert"
            >
              {" "}
              {this.state.error}{" "}
            </div>
          ) : (
            "Descrição"
          )}
        </label>
        <form>
          <textarea
            onChange={this.onChangeDescricao}
            value={this.state.descricao}
            placeholder="Por favor insira uma descrição."
            className="form-control"
          />
        </form>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {this.renderDragMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>

        {!!this.state.uploadedFiles.length && (
          <Container>
            {this.state.uploadedFiles.map(uploadedFile => (
              <li key={uploadedFile.id}>
                <FileInfo>
                  <div style={{ textAlign: "left" }}>
                    <span>
                      <strong>{uploadedFile.file.name}&nbsp;&nbsp;</strong>
                      {uploadedFile.readableSize} &nbsp;&nbsp;
                      {!uploadedFile.uploaded && (
                        <button
                          onClick={() => this.handleDelete(uploadedFile.id)}
                        >
                          Excluir (Tente novamente)
                        </button>
                      )}
                    </span>
                  </div>
                </FileInfo>
                <div>
                  {!uploadedFile.uploaded && !uploadedFile.error && (
                    <CircularProgressbar
                      styles={{
                        root: { width: 25 },
                        path: { stroke: "black" }
                      }}
                      strokeWidth={6}
                      percentage={uploadedFile.progress}
                      text={`${uploadedFile.progress}%`}
                    />
                  )}
                  {uploadedFile.uploaded && (
                    <MdCheckCircle size={24} color="#78e5d5" />
                  )}
                  {uploadedFile.error && <MdError size={24} color="#e57878" />}
                </div>
              </li>
            ))}
            <br />
            <button
              onClick={e => this.deletePaste()}
              type="button"
              className="btn btn-danger"
              style={{ height: "30px", padding: "0px" }}
            >
              Cancelar
            </button>
            {"  "}
            <button
              onClick={e => this.onClickSendFiles()}
              type="button"
              className="btn btn-success"
              style={{ height: "30px", padding: "0px" }}
            >
              Enviar
            </button>
          </Container>
        )}
      </div>
    );
  }
}
