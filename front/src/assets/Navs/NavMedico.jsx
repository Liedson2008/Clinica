import { Link } from "react-router-dom";

function NavMedico() {

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light position-absolute w-100">
  <Link className='navbar-brand fw-bold fs-3' to='/'>CLINICA</Link>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
       <Link className='nav-link' to='/'>AgendarConsulta</Link>
      </li>
      <li className="nav-item">
        <Link className='nav-link' to='/medico/login'>HistoricoConsultas</Link>
      </li>
    </ul>
  </div>
</nav>
    )
}
export default NavMedico;