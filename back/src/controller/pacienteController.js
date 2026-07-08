import { login, listar, cadastrar, agendar, medicos } from '../model/pacienteModel.js';

const loginPaciente = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const paciente = await login(email);

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente nao encontrado' });
        }
        if (paciente.senha !== senha) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }
        if (paciente.senha == senha) {
            return res.status(200).json({ message: 'Login bem-sucedido', paciente });
        }
    } catch (error) {
        console.error('Erro no login do paciente: ', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

const listarConsultas = async (req, res) => {
    const id_paciente = req.params.id;
    try {
        const consultas = await listar(id_paciente);
        if (!consultas) {
            return res.status(404).json({ message: 'Nenhuma consulta encontrada' })
        }
        return res.status(200).json(consultas)
    } catch (error) {
        console.error('Erro em listar as consultas', error)
        return res.status(500).json({ message: 'Erro no servidor' })
    }
}

const cadastrarPaciente = async (req, res) => {
    const dados = req.body;
    try {
        const resultado = await cadastrar(dados);
        return res.status(200).json({ message: 'Paciente cadastrado com sucesso' });
    } catch (error) {
        if (error.errno === 1062) {
            console.error('email ja existente', error);
            return res.status(400).json({ message: 'O email informado ja esta sendo usado, porfavor informa outro' })
        }
        console.error('error no servidor', error);
        return res.status(500).json({ message: 'erro no servidor' })
    }
}

const agendarConsulta = async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await agendar(dados);
        return res.status(200).json({message: 'Consulta agendada com sucesso'});
    }catch (error) {
        console.error('erro ao agendar consulta: ', error);
        return res.status(500).json({message: 'Erro no servidor ao agendar consulta'})
    }
}

const listarMedicos = async (req, res) => {
    try {
        const resposta = await medicos();
        return res.status(200).json(resposta);
    }catch (error) {
        console.error('error ao listar medicos: ', error);
        return res.status(500).json({message: 'Erro no servidor ao listar medicos', error: error.message});
    }
}

export default { loginPaciente, listarConsultas, cadastrarPaciente, agendarConsulta, listarMedicos };