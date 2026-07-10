import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function MedicoEditar() {

    const location = useLocation();
    const { id, data, tipo, descricao, id_paciente, status } = location.state.consulta;

    const [Dados, setDados] = useState({
        id: id,
        data: data ? data.split('T')[0] : '',
        tipo: tipo,
        descricao: descricao,
        id_paciente: id_paciente,
        status: status
    })
    const [pacientes, setPacientes] = useState([]);
    const [nomePaciente, setNomePaciente] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

    const navigate = useNavigate();

    const handlePaciente = (e) => {
        const valor = e.target.value;
        setNomePaciente(valor);

        if (valor.length > 0) {
            const filtrados = pacientes.filter(p => p.nome.toLowerCase().startsWith(valor.toLowerCase()));
            setPacientesFiltrados(filtrados)
            setDropDown(true);

        } else {
            setDropDown(false);
            setDados({ ...Dados, id_paciente: '' });
        }
    }

    const selecionarPaciente = (paciente) => {
        setNomePaciente(paciente.nome);
        setDropDown(false);
        setDados({ ...Dados, id_paciente: paciente.id });
    }

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
            const resposta = await axios.put('http://localhost:3000/medico/editarconsulta', Dados);
            console.log(resposta.data);
            alert('Edição efetuada com sucesso');
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
                setNomePaciente(pacientes.data.find(p => p.id === Number(id_paciente))?.nome || '');
                setPacientes(pacientes.data);
            } catch (error) {
                console.error('error ao listar pacientes: ', error.message);
                alert('erro ao listar pacientes, tente agendar novamente mais tarde');
            }
        }

        listarPacientes();
    }, []);
    return (
        <div className='container-fluid p-0 d-flex justify-content-center align-items-center vh-100' style={{
            background: 'linear-gradient(to bottom right, #b0e6e2, #3dbbb5)'
        }}>
            <div className="card shadow w-100" style={{ maxWidth: '800px' }}>
                <div className="card-body">
                    <h2 className='card-title mb-4'>Agendar consulta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-6'>
                                <label className='form-label'>Data</label>
                                <input type='date' name='data' className='form-control mb-3' required value={Dados.data ? Dados.data.split('T')[0] : ''} onChange={handleChange} />
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>Tipo</label>
                                <select name='tipo' className='form-select' required value={Dados.tipo} onChange={handleChange}>
                                    <option value=''>Selecione o tipo</option>
                                    <option value='consulta'>Consulta</option>
                                    <option value='cirurgia'>Cirurgia</option>
                                    <option value='retorno'>Retorno</option>
                                </select>
                            </div>
                            <div className='col-12'>
                                <label className='form-label mt-2'>Descrição</label>
                                <textarea
                                    name='descricao'
                                    className='form-control'
                                    rows={4}
                                    maxLength={200}
                                    style={{ resize: 'none' }}
                                    onChange={handleChange}
                                    value={Dados.descricao}
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label mt-2'>Paciente</label>
                                <div style={{ position: 'relative' }}>
                                    <input className='form-control mb-3' required value={nomePaciente} onChange={handlePaciente} />
                                    {dropDown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '38px',
                                            left: 0,
                                            right: 0,
                                            zIndex: 1000,
                                            backgroundColor: 'white',
                                            border: '1px solid #ced4da',
                                            borderRadius: '0.375rem',
                                            maxHeight: '200px',
                                            overflowY: 'auto'
                                        }}>
                                            {pacientesFiltrados.length > 0 ? (
                                                pacientesFiltrados.map(paciente => (
                                                    <div key={paciente.id} onClick={() => selecionarPaciente(paciente)}
                                                        className='dropdown-item'
                                                        style={{ cursor: 'pointer' }}>
                                                        {paciente.nome}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='dropdown-item text-muted'>Nenhum paciente encontrado</div>
                                            )}

                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>Status</label>
                                <select name='status' className='form-select' required value={Dados.status} onChange={handleChange}>
                                    <option value='agendada'>Agendada</option>
                                    <option value='finalizada'>Finalizada</option>
                                    <option value='falta'>Falta</option>
                                </select>
                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary'>Editar Consulta</button>
                    </form>
                </div>
            </div>


        </div>
    )

}
export default MedicoEditar;