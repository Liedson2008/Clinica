import {listar, cadastrar} from '../model/medicoModel.js';

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
        return res.json({message: 'Medico cadastrado com sucesso'});
    } catch (error) {
        console.error('Erro no cadastro do medico: ', error);
        return res.status(500).json({message: 'Erro no servidor'})
    }
}