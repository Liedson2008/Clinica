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
            const resposta = await axios.post('http://localhost:3000/medico', Dados);
            console.log(resposta.data);

                alert('medico cadastrado com sucesso');
                navigate('/login/medico');
            
        } catch (error) {
            console.error('Erro ao cadastrar medico: ', error.response.data);
            alert(`Erro ao cadastrar medico: ${error.response.data.message}`);
        }
    }
    return (
        <div className='container-fluid p-0 d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className="card shadow w-100" style={{ maxWidth: '500px'}}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Cadastro Médico</h2>
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


        </div>
    )
}
export default CadastrarMedico;