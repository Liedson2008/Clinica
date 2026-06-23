import db from '../config/db.js';

const loginMedico = async (email) => {
    const [dados] = await db.query(
        'SELECT id, senha From medicos WHERE email = ?',
         [email]);

         return dados[0];
}

const listarConsultas = async (id_medico) => {
    const [dados] = await db.query(
        'SELECT * FROM consultas WHERE id_medico = ?',
        [id_medico]
    );
    return dados;
}

 const cadastrarMedico = async (dados) => {
    const {nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha} = dados;
    const tipo = 'medico';
    const resultado = await  db.query(
        'INSERT INTO medicos (nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, data_nascimento, sexo, telefone, email, especialidade, crm, senha, tipo] 
   );
   return resultado;
}

export {loginMedico, listarConsultas, cadastrarMedico};