import {login, listar, cadastrar, agendar, pacienets} from '../model/medicoModel.js';

const loginMedico = async (req, res) => {
    const {email, senha} = req.body;
    try {
      const medico = await login(email);
      if(!medico) {
        return res.status(404).json({message: 'Médico nao encontrado'});
      }
      if(medico.senha !== senha) {
        return res.status(401).json({message: 'Senha incorreta'});
      }
      if(medico.senha == senha) {
        return res.status(200).json({message: 'Login bem-sucedido', medico});
      }
    }catch (error){
        console.error('Erro no login do medico: ' , error);
        return res.status(500).json({message: 'Erro no servidor'});
    }
}

const listarConsultas = async (req, res) => {
    const id_medico = req.params.id;
    try {
        const consultas = await listar(id_medico);

        if(!consultas) {
            return res.status(404).json({message: 'Nenhuma consulta encontrada para este medico'});
        }
        return res.status(200).json(consultas);
    } catch (error) {
        console.error('Erro ao listar consultas: ', error);
        return res.status(500).json({message: 'Erro no servidor'})
    }
}

const cadastrarMedico = async (req, res) => {
    const dados = req.body;
    try { 
        const resultado = await cadastrar(dados);
        return res.status(200).json({message: 'Medico cadastrado com sucesso'});
    } catch (error) {
        if(error.errno === 1062){
        console.error('email ja existente: ', error);
        return res.status(400).json({message: 'O email informado ja esta cadastrado, porfavor informe outro email'});
        }
        console.error('Erro ao cadastrar medico: ', error);
        return res.status(500).json({message: 'Erro no servidor'});
    }
}

const agendarConsulta = async (req, res) => {
    const dados = req.body;
    try {
        const res = await agendar(dados);
        return res.status(200).json({message: 'Consulta agendada com sucesso'});
    }catch (error) {
        console.error('erro ao agendar consulta: ', error);
        return res.status(500).json({message: 'Erro no servidor ao agendar consulta'})
    }
}

const listarPacientes = async (req, res) => {
    try {
        const res = await pacientes();
        return res.status(200).json(res);
    }catch (error) {
        console.error('error ao listar pacientes: ', error);
        return res.status(500).json({message: 'Erro no servidor ao listar pacientes'});
    }
}
export default {loginMedico, listarConsultas, cadastrarMedico, agendarConsulta, listarPacientes};