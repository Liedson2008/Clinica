import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavMedico from "../Navs/NavMedico";
import NavPaciente from "../Navs/NavPaciente";

function RotaProtegida({ tipoPermitido }) {
    const tipo = localStorage.getItem('tipo_usuario')

    if (!tipo) {
        return <Navigate to='/' replace />
    }
    if (tipo !== tipoPermitido) {
        return <Navigate to='/' replace />
    }

    if (tipo == 'paciente') {
        return (
            <div>
                <NavPaciente />
                <div className='container' style={{marginTop: '70px'}}>
                    <Outlet />
                </div>
            </div>
        )
    }
    if (tipo == 'medico') {
        return (
            <div>
                <NavMedico />
                <div className='container' style={{marginTop: '70px'}}>
                    <Outlet />
                </div>
            </div>
        )
    }

    return <Navigate to='/' replace />

}
export default RotaProtegida;