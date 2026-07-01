import db from '../config/db.js';

const login = async (email) => {
    const [dados] = await db.query(
        'SELECT id, senha, tipo From medicos WHERE email = ?',
         [email]);

         return dados[0];
}

const listar = async (id_medico) => {
    const [dados] = await db.query(
        'SELECT consulats.data, consultas.tipo, consultas.descricao, medico.nome as medico_nome, paciente.nome as paciente_nome FROM consultas JOIN medico ON consultas.medico_id = medicos.id JOIN paciente ON consultas.paciente_id = pacientes.id WHERE consultas.id_medico = ?',
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

export {login, listar, cadastrar};