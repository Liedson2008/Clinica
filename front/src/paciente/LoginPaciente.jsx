import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPaciente() {
    const [Dados, setDados] = useState({
        email: '',
        senha: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setDados({
            ...Dados,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await axios.post('http://localhost:3000/paciente/login', Dados);
            console.log(resposta.data);
            alert('Login efetuado com sucesso');
            localStorage.setItem('id_usuario', resposta.data.paciente.id);
            localStorage.setItem('tipo_usuario', resposta.data.paciente.tipo);
            navigate('/paciente/home');
        } catch (error) {
            console.log('erro: ', error.response.data);
            alert(error.response.data.mensage);
        }
    }


    return (
        <div className='container-fluid p-0 d-flex justify-content-center align-items-center min-vh-100 bg-primary'>
            <div className="card shadow w-100" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Login Paciente</h2>
                    <form onSubmit={handleSubmit}>

                        <label className='form-label'>Email</label>
                        <input type='email' name='email' className='form-control mb-3' required value={Dados.email} onChange={handleChange} />

                        <label className='form-label'>Senha</label>
                        <input type='password' name='senha' className='form-control mb-3' required value={Dados.senha} onChange={handleChange} />

                        <button type='submit' className='btn btn-primary'>Logar</button>
                    </form>
                    <div className='d-flex align-items-center justify-content-center p-2'>
                    <Link className='link link-secondary text-decoration-none' to='/cadastrar/paciente'>Criar Conta</Link>
                    </div>
                </div>
            </div>


        </div>
    )

}
export default LoginPaciente;