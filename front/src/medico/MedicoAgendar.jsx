import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MedicoAgendar() {
    const [Dados, setDados] = useState({
        data: '',
        tipo: '',
        descricao: '',
        id_paciente: '',
        id_medico: localStorage.getItem('id_usuario'),
        status: 'agendada'
    })
    const [pacientes, setPacientes] = useState([]);

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
            const resposta = await axios.post('http://localhost:3000/medico/agendar', Dados);
            console.log(resposta.data);
            alert('Agendamento efetuado com sucesso');
            navigate('/home/medico');
        } catch (error) {
            console.log('erro: ', error.response.data);
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        const listarPacientes = async () => {
        try {
            const pacientes = await axios.get('http://localhost:3000/medico/pacientes');
            setPacientes(pacientes.data);
        } catch (error) {
            console.error('error ao listar pacientes: ', error.message);
            alert('erro ao listar pacientes, tente agendar novamente mais tarde');
        }
    }
    }, []);
    return (
        <div className='d-flex justify-content-center align-items-center vh-100' style={{
            background: 'linear-gradient(to bottom right, #b0e6e2, #3dbbb5)',
            whidth: '100%',
        }}>
            <div className="card shadow w-100" style={{ maxWidth: '800px' }}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Agendar consulta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <label className='form-label'>Data</label>
                            <input type='date' name='date' className='form-control mb-3 col-2' required value={Dados.data} onChange={handleChange} />

                            <label className='form-label'>Tipo</label>
                            <select name='tipo' className='form-select col-2' required value={Dados.tipo} onChange={handleChange}>
                                <option value=''>Selecione o tipo</option>
                                <option value='consulta'>Consulta</option>
                                <option value='cirurgia'>Cirurgia</option>
                                <option value='retorno'>Retorno</option>
                            </select>

                            <label className='form-label'>Descrição</label>
                        <input type='text' name='descricao' className='form-control mb-3 col-12' maxLength={200} required value={Dados.descricao} onChange={handleChange} />

                        <input list='pacientes' name='id_paciente' className='form-control mb-3 col-12' required onChange={handleChange} placeholder='Selecione o paciente' />
                        <datalist id='pacientes'>
                            {pacientes.map((paciente) => (
                                <option key={paciente.id} value={paciente.id}>{paciente.id}: {paciente.nome}</option>
                            ))}
                        </datalist>
                        </div>

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
export default MedicoAgendar;