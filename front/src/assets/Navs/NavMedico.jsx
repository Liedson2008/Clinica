import { Link } from "react-router-dom";

function NavMedico() {

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <Link className='navbar-brand fw-bold fs-3' to='/'>CLINICA</Link>
  <div className="collapse navbar-collapse" id="navbarNav">
  </div>
</nav>
    )
}
export default NavMedico;