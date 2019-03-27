import React, { Component } from "react";
import { api } from "../../services/api";
import { verifyToken, logout } from "../../services/auth";
import {
  Jumbotron,
  H1,
  Button1,
  Collapse,
  CardBody1,
  Div1,
  Label,
  Label2,
  Label3, 
  Card2,
  CardBody2,
  Card3,
  CardBody3,
  Media,
  MediaBody,
  Button2,
  Button3
} from "./styles";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmitComent = this.onSubmitComent.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onSubmitLike = this.onSubmitLike.bind(this);
    this.onClickLoad = this.onClickLoad.bind(this);
    this.state = {
      newComent: "",
      newPost: "",
      TextoCampus: "",
      posts: [],
      user: [],
      post_id: "",
      comentario_id: "",
      skip: 0
    };
  }
  async componentDidMount() {
    let skip = 0;
    await api
      .get("/posts/" + skip.toString())
      .then(response => response.data)
      .then(post => this.setState({ posts: post }))
      .catch(err => console.log(err))
    this.setState({ skip: 0 });
  }

  onClickLoad = async e => {
    await this.setState({ skip: this.state.skip + 5 });
    await api
      .get("/posts/" + this.state.skip.toString())
      .then(response => response.data)
      .then(posts => {
        this.setState({ posts: this.state.posts.concat(posts) });
      });
  };

  onSubmitPost = async e => {
    e.preventDefault();
    if ( await verifyToken()) {
      const obj = {
        campus: this.state.TextoCampus
          ? this.state.TextoCampus
          : "Campus não informado",
        texto: this.state.newPost
      };

      if (this.state.newPost !== "") {
        await api.post("/posts/", obj).catch(err => console.log(err));
        this.componentDidMount();
      }
      this.setState({
        TextoCampus: "",
        newPost: ""
      });
    }else {
      logout()
      this.props.history.push("/login");
    }
  };

  onSubmitLike = async e => {
    e.preventDefault();

    if (await verifyToken()) {
      await api
        .get("/users/")
        .then(res => res.data)
        .then(u => this.setState({ user: u }))

      const obj = {
        user_id: this.state.user._id,
        comentario_id: this.state.comentario_id
      };

      await api
        .put("/posts/updatelike/" + this.state.post_id.toString(), obj)
        .catch(err => console.log(err));

      this.componentDidMount();
    }else {
      logout()
      this.props.history.push("/login");
    }

  };

  onSubmitComent = async e => {
    e.preventDefault();

    if (await verifyToken()) {

      await api
        .get("/users/")
        .then(res => res.data)
        .then(u =>  this.setState({ user: u }) );

      const obj = {
        texto: this.state.newComent,
        autor: this.state.user.name,
        foto: this.state.user.foto
      };

      let url = "/posts/" + this.state.post_id.toString();
      await api.put(url, obj).catch(b => console.log(b));

      this.setState({ newComent: "", post_id: "" });
      this.componentDidMount();

    } else {
      logout()
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <Jumbotron>
        <H1>
          <strong>LIVE ACTION</strong>
        </H1>

        <Button1
          aria-expanded="false"
          aria-controls="2"
          data-toggle="collapse"
          data-target="#2"
          data-whatever="@getbootstrap"
        >
          Nova Publicação
        </Button1>

        <Collapse id="2">
          <CardBody1>
            <form method="post" onSubmit={this.onSubmitPost}>
              <Div1>
                <Label>Mensagem</Label>
                <textarea
                  onChange={e => this.setState({ newPost: e.target.value })}
                  value={this.state.newPost}
                  placeholder="Escreva sua mensagem"
                  className="form-control"
                  id="message-text"
                />
              </Div1>

              <Label2>Selecione seu Campus</Label2>

              <div
                className="form-group"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <select
                  onChange={e => this.setState({ TextoCampus: e.target.value })}
                  value={this.state.TextoCampus}
                  className="form-control form-control-sm"
                  style={{ width: "400px" }}
                >
                  <option selected> Informe seu Campus</option>
                  <option>Baixada Santista</option>
                  <option>São José dos Campos</option>
                  <option>Osasco</option>
                  <option>Diadema</option>
                </select>
              </div>

              <button
                aria-expanded="false"
                aria-controls="2"
                data-toggle="collapse"
                data-target="#2"
                type="submit"
                className="btn btn-secondary"
                style={{ marginRight: "25px", paddingTop: "1px" }}
              >
                Voltar
              </button>
              <button
                aria-expanded="false"
                aria-controls="2"
                data-toggle="collapse"
                data-target="#2"
                type="submit"
                className="btn btn-success"
                style={{ marginLeft: "25px", paddingTop: "1px" }}
              >
                Enviar
              </button>
            </form>
          </CardBody1>
        </Collapse>
        <Label3>
          {this.state.posts.map(post => {
            return (
              <Card2 key={post._id}>
                <div className="card-header" />
                <CardBody2>
                  <small>
                    - {post.texto} <br /> <br />
                    <span style={{ fontSize: "10px" }}>
                      {post.date} - {post.campus} - Anonymous
                    </span>
                  </small>
                </CardBody2>
                <div
                  className="collapse  bg-dark"
                  style={{ width: "100%" }}
                  id={post._id}
                >
                  <Card3>
                    {post.comentarios.map(comentario => {
                      return (
                        <CardBody3 key={comentario._id}>
                          <Media>
                            <img
                              src={
                                comentario.foto
                                  ? comentario.foto
                                  : "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg"
                              }
                              className="mr-3"
                              alt="..."
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "200px",
                                marginBottom: "0px",
                                paddingRight: "0px",
                                paddingBottom: "0px",
                                marginRight: "0px",
                                marginLeft: "0px"
                              }}
                            />
                            <MediaBody>
                              <strong
                                className="mt-0"
                                style={{
                                  color: "CornflowerBlue",
                                  paddingBottom: "0px",
                                  marginBottom: "0px"
                                }}
                              >
                                {" "}
                                {comentario.autor}{" "}
                              </strong>{" "}
                              {comentario.texto}
                            </MediaBody>
                            <form onSubmit={this.onSubmitLike}>
                              <button
                                onClick={e =>
                                  this.setState({
                                    post_id: post._id,

                                    comentario_id: comentario._id
                                  })
                                }
                                className="btn btn-link"
                                style={{
                                  paddingTop: "0px",
                                  paddingBottom: "0px"
                                }}
                              >
                                {" "}
                                <small>
                                  {comentario.like.quantidade > 1
                                    ? comentario.like.quantidade + " Curtiram"
                                    : comentario.like.quantidade + " Curtida"}
                                </small>
                              </button>
                            </form>
                          </Media>
                        </CardBody3>
                      );
                    })}
                    <form
                      method="post"
                      onSubmit={this.onSubmitComent}
                      style={{
                        justifyContent: "flex-start",
                        display: "flex"
                      }}
                    >
                      <input
                        type="text"
                        onChange={e =>
                          this.setState({
                            newComent: e.target.value,
                            post_id: e.target.id
                          })
                        }
                        id={post._id}
                        placeholder="Escreva seu comentário..."
                        value={this.state.newComent}
                        style={{
                          borderRadius: "100px",
                          border: "1px #ddd solid",
                          paddingBottom: "0px",
                          marginTop: "3px",
                          width: "535px",
                          height: "30px"
                        }}
                      />
                      <Button3 onClick={this.onSubmitComent}>
                        {" "}
                        <i className="fas fa-angle-double-right" />
                      </Button3>
                    </form>
                  </Card3>
                </div>
                <Button2
                  data-toggle="collapse"
                  data-target={"#" + post._id}
                  aria-controls="collapseExample"
                  data-whatever="@getbootstrap"
                  aria-expanded="false"
                >
                  <small style={{ fontSize: "12px" }}>
                    ({post.quantidade_comentarios}) Comentarios
                  </small>
                </Button2>
              </Card2>
            );
          })}
        </Label3>
        <button
          className="btn btn-success"
          onClick={this.onClickLoad}
          style={{ margin: "10px", padding: "0px" }}
        >
          {" "}
          Carregar mais...
        </button>
      </Jumbotron>
    );
  }
}
