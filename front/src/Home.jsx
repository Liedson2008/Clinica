import { Link } from "react-router-dom";

function Home() {
    return(
        <div className='content mt-5'>
      <h1>Clinica</h1>
      <Link className='btn btn-primary' to='/login/paciente' >Login Paciente</Link>
      <Link className='btn btn-primary' to='/login/medico' >Login Medico</Link>
</div>
    )
}

export default Home;