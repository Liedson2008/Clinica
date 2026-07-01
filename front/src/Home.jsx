import { Link } from "react-router-dom";
import logo from './assets/imagens/logo.png'

function Home() {
    return (
        <div className='container-fluid' style={{ marginTop: '0px',
         background: 'linear-gradient(to bottom right, #b0e6e2, #3dbbb5)',
          minHeight: '100vh'}}>
            <div className='row justify-content-center'>
                <img src={ logo } alt="logo" className="col-12" style={{ width: '170px', height: '140px', marginTop:'20px' }} />
                <h1 className="col-12 text-center text-white fw-bold" style={{ fontSize: '100px', marginTop: '20px', WebkitTextStroke: '1px #000000', textShadow: '3px 3px 6px black' }}>CLINICA VIDA</h1>
                <h5 className="col-12  text-center text-white" style={{ padding: '10px 200px', marginTop: '100px', textShadow: '3px 3px 6px black' }}>Na Clínica Vida, nosso compromisso vai muito além do atendimento médico; nós cuidamos de você e da sua família em todas as etapas da jornada de saúde. Combinando um atendimento humanizado, dedicação e excelência profissional, oferecemos um suporte completo que une a proximidade do atendimento em clínica geral — focado na prevenção, diagnósticos precisos e no acompanhamento contínuo do seu bem-estar — à alta precisão e segurança dos nossos serviços cirúrgicos. Contamos com uma infraestrutura moderna e uma equipe altamente qualificada, pronta para acolher suas necessidades com o respeito e a agilidade que você merece. Na Clínica Vida, entendemos que a saúde é o seu bem mais precioso, e é por isso que dedicamos nossa estrutura para proteger, curar e transformar a sua história todos os dias.</h5>
                <div className="row justify-content-center gap-5" style={{marginTop:'150px'}}>

                    <div className="col-auto text-center">
                        <p className="text-white mb-4">Acesse sua conta para agendar consultas e ver seu histórico</p>
                        <Link className='btn btn-primary' to='/login/paciente'>Login Paciente</Link>
                    </div>

                    <div className="col-auto text-center">
                        <p className="text-white mb-4">Acesse sua conta para gerenciar consultas e pacientes</p>
                        <Link className='btn btn-primary' to='/login/medico'>Login Médico</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;