import React, { Component } from "react";
import user from "../../images/user.png"
import avatar from "../../images/avatar.png"
import study from "../../images/study.jpg"
import drive from "../../images/drive.png"
import { Link } from "react-router-dom";
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div >
                <div style={{ margin: '0px', color: '#ddd', padding: '0px', paddingTop: "100px", height: '600px', display: 'flex', justifyContent: 'space-around', border: 'transparent', background: 'transparent' }}>
                    <div style={{ textAlign: 'start' }} >  <span style={{ fontSize: "25px" }} > Informações sobre disciplinas </span> <br /> Consulte ementa, carga-horária, pré-requisitos <br /> e outras informações  sobre disciplinas centradas em um só lugar.
                        < br />
                        <Link className="btn btn-primary" to="/listagemucs"> Consultar</Link>
                        <br /> <br />
                        <span style={{ fontSize: "25px" }} > Compartilhe e consulte arquivos </span> <br />Contribua realizando upload de arquivos no google drive, sem limites e free.<br />
                        <Link className="btn btn-primary" to="files"> Contribuir</Link>
                    </div>

                    <div style={{
                        backgroundImage: 'url(' + user + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        border: 'transparent',
                        borderRadius: '20px',
                        width: '700px', height: '490px'
                    }}></div>

                </div>
                <div style={{ backgroundColor: 'white', margin: '0px', padding: '0px', height: '500px' }}>


                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '80px' }}>


                        <div className="card" style={{ alignItems: 'center', border: 'transparent', background: 'white' }}>

                            <div style={{
                                padding: '0px',
                                width: '70px',
                                height: '70px',
                                backgroundImage: 'url(' + avatar + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            </div> <br />
                            <strong>Painel Usuario</strong>  <small>Acesse sua area de usuario, ajuste e acompanhe  < br />sua quantidade de horas complementares, disciplinas obrigatorias já cursadas e <br />lista de disciplinas interdisciplinares para BCT (Ciência e Tecnologia).</small>

                        </div>

                        <div className="card" style={{ alignItems: 'center', border: 'transparent', background: 'white' }}>
                            <div style={{
                                padding: '0px',
                                width: '75px',
                                height: '75px',
                                backgroundImage: 'url(' + study + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            </div>
                            <br />


                            <strong>Lista Disciplinas</strong> <small>Lista de disciplinas com suas respectivas informações, pré-requisitos e ementa.</small> </div>

                        <div className="card" style={{ alignItems: 'center', border: 'transparent', background: 'white' }}>

                            <div style={{
                                padding: '0px',
                                width: '70px',
                                height: '70px',
                                backgroundImage: 'url(' + drive + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            </div>
                            <br />


                            <strong>Google Drive</strong> <small>
                                Upload  ilimitado de arquivos.Compartilhe seus arquivos  <br />(listas, exercicios, livros em formato digital,notas de aulas e outros)  <br /> e acesse materiais separados por seção postados por outros alunos.</small>
                        </div>


                    </div>
                </div>
                <div className="footer bg-dark" style={{ margin: '0px', padding: '0px', height: '200px', color: 'white' }}>
                    <br /> <br /> <br /> <br /> <br /> <br />
                    <span>© 2019-2020 ICTAPP. </span>

                </div>
            </div>
        );
    }


}
