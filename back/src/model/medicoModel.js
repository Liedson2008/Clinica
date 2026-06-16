import db from '../config/db.js';

const listar = async (id_medico) => {
    const [dados] = await db.query(
        'SELECT * FROM consultas WHERE id_medico = ?',
        [id_medico]
    );
    return dados;
}

const cadastrar = async (dados) => {
    const {nome, idade, sexo, telefone, email, especialidade, crm, senha} = dados;
    const tipo = 'medico';
    const resultado = await  db.query(
        'INSERT INTO medicos (nome, idade, sexo, telefone, email, especialidade, crm, senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, idade, sexo, telefone, email, especialidade, crm, senha, tipo] 
   );
   return resultado;
}

export default {listar, cadastrar};