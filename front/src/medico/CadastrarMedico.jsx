import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CadastrarMedico() {
    const [Dados, setDados] = useState({
        nome: '',
        data_nascimento: '',
        sexo: '',
        telefone: '',
        email: '',
        especialidade: '',
        crm: '',
        senha: ''
    })
    const [status, setStatus] = useState('');
    const [errorMensagem, setErrorMensagem] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDados({
            ...Dados,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await axios.post('http://localhost:3000/medico/cadastrar', Dados);
            console.log(resposta.data);

            setStatus('sucesso');
            
        } catch (error) {
            console.error('Erro ao cadastrar medico: ', error.response.data);
            setStatus('erro');
             setErrorMensagem(error.response.data.message || 'Erro desconhecido');
        }
    }
    return (
        <div className='container-fluid p-0 d-flex justify-content-center align-items-center vh-100 bg-primary' style={{ marginTop: '0px',
         background: 'linear-gradient(to bottom right, #b0e6e2, #3dbbb5)',
          minHeight: '100vh'}}>
            <div className="card shadow w-100" style={{ maxWidth: '500px'}}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Cadastrar Médico</h2>
                    <form onSubmit={handleSubmit}>
                        <label className='form-label'>Nome</label>
                        <input type='text' name='nome' className='form-control mb-3' required value={Dados.nome} onChange={handleChange} />

                        <div className='row g-3 mb-3'>

                            <div className='col-md-6'>
                                <label className='form-label'>Data de Nascimento</label>
                                <input type='date' name='data_nascimento' className='form-control mb-3' required value={Dados.data_nascimento} onChange={handleChange} />
                            </div>

                            <div className='col-md-6'>
                                <label className='form-label'>Sexo</label>
                                <select name='sexo' className='form-select mb-3' required value={Dados.sexo} onChange={handleChange}>
                                    <option value=''>Selecione</option>
                                    <option value='M'>Masculino</option>
                                    <option value='F'>Feminino</option>
                                </select>
                            </div>
                        </div>

                        <label className='form-label'>Telefone</label>
                        <input type='text' max-length='11' name='telefone' className='form-control mb-3' required value={Dados.telefone} onChange={handleChange} />

                        <label className='form-label'>Email</label>
                        <input type='email' name='email' className='form-control mb-3' required value={Dados.email} onChange={handleChange} />

                        <label className='form-label'>Especialidade</label>
                        <input type='text' name='especialidade' className='form-control mb-3' required value={Dados.especialidade} onChange={handleChange} />

                        <label className='form-label'>CRM</label>
                        <input type='text' name='crm' className='form-control mb-3' required value={Dados.crm} onChange={handleChange} />

                        <label className='form-label'>Senha</label>
                        <input type='password' name='senha' className='form-control mb-3' required value={Dados.senha} onChange={handleChange} />

                        <button type='submit' className='btn btn-primary'>Cadastrar</button>
                    </form>
                </div>
            </div>
            {status === 'sucesso' && 
            <div className=' position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3' style={{zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className='alert alert-success mt-3'>
                        <h5>Cadastro realizado com sucesso!</h5>
                    <button className='btn btn-primary mt-2' onClick={() => navigate('/login/medico')} >Ir para o login</button>
                    </div>
                    </div>
                    }
                    {status === 'erro' && 
                    <div className=' position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3' style={{zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className='alert alert-danger mt-3'>
                        <h5>Erro ao cadastrar medico: {errorMensagem}</h5>
                        <button className='btn btn-primary mt-2' onClick={() => setStatus('')} >OK</button>
                        </div>
                        </div>
                        }
        </div>
    )
}
export default CadastrarMedico;