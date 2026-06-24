import db from '../config/db.js';

const login = async (email) => {
    const [dados] = await db.query(
        'SELECT id, senha, tipo FROM paciente WHERE email = ?',
        [email]
    )
    return dados[0];
}

const listar = async (id_paciente) => {
   const [dados] = await db.query(
    'SELECT * FROM consultas where id_paciente = ?',
     [id_paciente]
    )
    return dados;
}

const cadastrar = async (dados) => {
    const { nome, data_nascimento, sexo, telefone, email, senha } = dados;
    const tipo = paciente;
    const resultado = await db.query(
        'INSERT INTO pacientes (nome, data_nascimento, sexo, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, data_nascimento, sexo, telefone, email, senha, tipo]
    )
    return resultado;
}

export { login, listar, cadastrar};