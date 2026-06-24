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
    </Route>

    <Route element={<RotaProtegida tipoPermitido='medico' />}>
    <Route path='/home/medico' element={<HomeMedico />} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
