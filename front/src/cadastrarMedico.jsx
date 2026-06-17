import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function cadastrarMedico() {
    const [dados, setDados] = useState({
        nome: '',
        idade: '',
        sexo: '',
        telefone: '',
        email: '',
        especialidade: '',
        crm: '',
        senha: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDados({
            ...dados,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await axios.post('http://localhost:3000/medicos/cadastrar', dados);
            console.log(resposta.data);
        }catch (error) {
            console.error('Erro ao cadastrar medico: ', error.response.data);
        }    }
    return (
        <></>
    )
}
export default cadastrarMedico;