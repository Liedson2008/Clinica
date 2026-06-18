import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastrarMedico from './CadastrarMedico.jsx';
import LoginMedico from './LoginMedico.jsx';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/cadastro/medico' element={<CadastrarMedico />} />
    <Route path='/login/medico' element={<LoginMedico />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
