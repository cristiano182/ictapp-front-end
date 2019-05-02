import React, { Component } from "react";
import bg from "../../images/bg.jpg"
import bg2 from "../../images/bg2.png"
import user from "../../images/user.png"
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div >
                <div style={{ margin: '0px', color: '#ddd', padding: '0px', paddingTop: "100px", height: '600px', display: 'flex', justifyContent: 'space-around', border: 'transparent', background: 'transparent' }}>
                    <div style={{ textAlign: 'start' }} >  <span style={{ fontSize: "25px" }} > Compartilhe e consulte arquivos </span> <br /> Consulte ementa, carga-horária, pré-requisitos <br /> e outras informações  sobre disciplinas centradas em um só lugar.</div>
                    <div style={{
                        backgroundImage: 'url(' + user + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        border: 'transparent',
                        borderRadius: '20px',
                         width: '700px', height: '490px'  }}></div>

            </div>
            <div style={{ backgroundColor: 'white', margin: '0px', padding: '0px', height: '500px' }}>


                <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '80px' }}>


                <div><strong>Area Usuario</strong> <br /> <small>Acesse sua area de usuario, ajuste e acompanhe  < br />sua quantidade de horas complementares, disciplinas obrigatorias já cursadas e <br />lista de disciplinas interdisciplinares para BCT (Ciência e Tecnologia).</small></div>

                <div><strong>Lista Disciplinas</strong> <br /><small>Lista de disciplinas com suas respectivas informações, pré-requisitos e ementa.</small> </div>

                    <div> 
                        <strong>Google Drive</strong> <br /> <small>
                       Upload  ilimitado de arquivos.Compartilhe seus arquivos  <br />(listas, exercicios, livros em formato digital,notas de aulas e outros)  <br /> e acesse materiais separados por seção postados por outros alunos.</small>
                    </div>
                





                </div>
            </div>
            <div className="footer" style={{ margin: '0px', padding: '0px', height: '200px' }}>

            </div>
            </div >
        );
    }


}
