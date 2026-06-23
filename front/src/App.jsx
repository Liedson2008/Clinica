import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastrarMedico from './CadastrarMedico.jsx';
import LoginMedico from './LoginMedico.jsx';
import LoginPaciente from './LoginPaciente.jsx';
import CadastrarPaciente from './CadastrarPaciente.jsx';
import Nav from './Nav.jsx';

function App() {

  return (
   <BrowserRouter>
   <Nav />
   <Routes>
    <Route path='/medico/cadastrar' element={<CadastrarMedico />} />
    <Route path='/medico/login' element={<LoginMedico />} />
    <Route path='/' element={<LoginPaciente />} />
    <Route path='/paciente/cadastrar' element={<CadastrarPaciente />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
