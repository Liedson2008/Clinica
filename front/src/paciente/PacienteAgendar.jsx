import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function PacienteAgendar() {
    const [Dados, setDados] = useState({
        data: '',
        tipo: '',
        descricao: '',
        id_paciente: localStorage.getItem('id_usuario'),
        id_medico: '',
        status: 'agendada'
    })
    const [medicos, setMedicos] = useState([]);
    const [nomeMedico, setNomeMedico] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [medicosFiltrados, setMedicosFiltrados] = useState([]);

    const navigate = useNavigate();

    const handleMedico = (e) => {
        const valor = e.target.value;
        setNomeMedico(valor);

        if (valor.length > 0) {
            const filtrados = medicos.filter(m => m.nome.toLowerCase().startsWith(valor.toLowerCase()));
            setMedicosFiltrados(filtrados)
            setDropDown(true);

        } else {
            setDropDown(false);
            setDados({ ...Dados, id_medico: '' });
        }
    }

    const selecionarMedico = (medico) => {
        setNomeMedico(medico.nome);
        setDropDown(false);
        setDados({ ...Dados, id_medico: medico.id });
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
            const resposta = await axios.post('http://localhost:3000/paciente/agendar', Dados);
            console.log(resposta.data);
            alert('Agendamento efetuado com sucesso');
            navigate('/home/paciente');
        } catch (error) {
            console.log('erro: ', error.response.data);
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        const listarMedicos = async () => {
            try {
                const medicos = await axios.get('http://localhost:3000/paciente/medicos');
                setMedicos(medicos.data);
            } catch (error) {
                console.error('error ao listar medicos: ', error.message);
                alert('erro ao listar medicos, tente agendar novamente mais tarde');
            }
        }

        listarMedicos();
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
                                <input type='date' name='data' className='form-control mb-3' required value={Dados.data} onChange={handleChange} />
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
                                    placeholder='Digite a descrição'
                                    value={Dados.descricao}
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label mt-2'>Medico</label>
                                <div style={{ position: 'relative' }}>
                                    <input className='form-control mb-3' required value={nomeMedico} onChange={handleMedico} />
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
                                            {medicosFiltrados.length > 0 ? (
                                                medicosFiltrados.map(medico => (
                                                    <div key={medico.id} onClick={() => selecionarMedico(medico)}
                                                        className='dropdown-item'
                                                        style={{ cursor: 'pointer' }}>
                                                        {medico.nome}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='dropdown-item text-muted'>Nenhum medico encontrado</div>
                                            )}

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary'>Agendar</button>
                    </form>
                </div>
            </div>


        </div>
    )

}
export default PacienteAgendar;