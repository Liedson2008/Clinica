import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HomePaciente() {

    const [consultas, setConsultas] = useState([]);
    const [status, setStatus] = useState('agendada');

    const handleChange = (e) => {

        setStatus(e.target.value);

    }
useState(() => {
    const listarConsultas = async () => {

        const id_paciente = localStorage.getItem('id_usuario');

        try {
            const resposta = await axios.get(`http://localhost:3000/paciente/${id_paciente}`);
            setConsultas(resposta.data);
        } catch (error) {
            console.error('erro ao listar consultas: ', error.response.data);
        }
    }

    listarConsultas();
}, []);
    

    return (
        <div className='container' style={{ marginTop: '100px' }}>
            <div className='row'>
                <div className='col-auto'>
                    <label className='form-label'>Status da consulta</label>
                    <select name='status' className='form-select mb-3' value={status} onChange={handleChange}>
                        <option value=''>Agendadas</option>
                        <option value='M'>Finalizadas</option>
                        <option value='F'>Faltas</option>
                    </select>
                </div>
            </div>
            <div>
                {consultas.length === 0 ? (
                    <p className="text-center text-muted mt-3">Nenhuma consulta encontrada</p>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="table">
                            <thead className='table-dark sticky-top'>
                                <tr>
                                    <th scope="col">Data</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Paciente</th>
                                    <th scope="col">Medico</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultas.map((consulta) => (
                                    <tr key={consulta.id}>
                                        <th scope="row">{new Date(consulta.data).toLocaleDateString('pt-br')}</th>
                                        <td>{consulta.tipo}</td>
                                        <td>{consulta.descricao}</td>
                                        <td>{consulta.paciente_nome}</td>
                                        <td>{consulta.medico_nome}</td>
                                        <td>{consulta.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Link to='/paciente/agendarconsulta' className='btn btn-primary mt-3'>Agendar Consulta</Link>
            </div>
        </div>
    )
}

export default HomePaciente;