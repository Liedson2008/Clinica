import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastrarMedico from './medico/CadastrarMedico.jsx';
import LoginMedico from './medico/LoginMedico.jsx';
import LoginPaciente from './paciente/LoginPaciente.jsx';
import CadastrarPaciente from './paciente/CadastrarPaciente.jsx';
import RotaProtegida from './assets/Rotas/RotaProtegida.jsx';
import HomePaciente from './paciente/HomePaciente.jsx';
import HomeMedico from './medico/HomeMedico.jsx';
import Home from './Home.jsx';
import MedicoAgendar from './medico/MedicoAgendar.jsx';
import PacienteAgendar from './paciente/PacienteAgendar.jsx';
import PacienteEditar from './paciente/PacienteEditar.jsx';
import MedicoEditar from './medico/MedicoEditar.jsx';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cadastrar/medico' element={<CadastrarMedico />} />
    <Route path='/login/medico' element={<LoginMedico />} />
    <Route path='/login/paciente' element={<LoginPaciente />} />
    <Route path='/cadastrar/paciente' element={<CadastrarPaciente />} />

    <Route element={<RotaProtegida tipoPermitido='paciente' />}>
    <Route path='/home/paciente' element={<HomePaciente />} />
    <Route path='/agendarconsulta/paciente' element={<PacienteAgendar />} />
    <Route path='/editarconsulta/paciente' element={<PacienteEditar />} />
    </Route>

    <Route element={<RotaProtegida tipoPermitido='medico' />}>
    <Route path='/home/medico' element={<HomeMedico />} />
    <Route path='/agendarconsulta/medico' element={<MedicoAgendar />} />
    <Route path='/editarconsulta/medico' element={<MedicoEditar />} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
