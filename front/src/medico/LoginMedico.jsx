import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginMedico() {
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
            const resposta = await axios.post('http://localhost:3000/medico/login', Dados);
            console.log(resposta.data);
            alert('Login efetuado com sucesso');
            localStorage.setItem('id_usuario', resposta.data.medico.id);
            localStorage.setItem('tipo_usuario', resposta.data.medico.tipo);
            const tipo = localStorage.getItem('id_usuario')
            console.log(tipo)
            navigate('/home/medico');
        } catch (error) {
            console.log('erro: ', error.response.data);
            alert(error.response.data.mensage);
        }
    }


    return (
        <div className='container-fluid p-0 d-flex justify-content-center align-items-center vh-100 bg-primary' style={{ marginTop: '0px',
         background: 'linear-gradient(to bottom right, #b0e6e2, #3dbbb5)',
          minHeight: '100vh'}}>
            <div className="card shadow w-100" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Login Médico</h2>
                    <form onSubmit={handleSubmit}>

                        <label className='form-label'>Email</label>
                        <input type='email' name='email' className='form-control mb-3' required value={Dados.email} onChange={handleChange} />

                        <label className='form-label'>Senha</label>
                        <input type='password' name='senha' className='form-control mb-3' required value={Dados.senha} onChange={handleChange} />

                        <button type='submit' className='btn btn-primary'>Logar</button>
                    </form>
                    <div className='text-center p-2'>
                        <Link className='link link-secondary text-decoration-none' to='/cadastrar/medico'>Criar Conta</Link>
                    </div>
                </div>
            </div>


        </div>
    )

}
export default LoginMedico;