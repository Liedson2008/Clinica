import db from '../config/db.js';

const loginMedico = async (email) => {
    const [dados] = await db.query(
        'SELECT * From medico WHERE email = ?',
         [email]);

         return dados[0];
}

const listar = async (id_medico) => {
    const [dados] = await db.query(
        'SELECT * FROM consultas WHERE id_medico = ?',
        [id_medico]
    );
    return dados;
}

 const cadastrar = async (dados) => {
    const {nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha} = dados;
    const tipo = 'medico';
    const resultado = await  db.query(
        'INSERT INTO medicos (nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha, tipo] 
   );
   return resultado;
}

export {loginMedico, listar, cadastrar};