import db from '../config/db.js';

const login = async (email) => {
    const [dados] = await db.query(
        'SELECT id, senha, tipo FROM pacientes WHERE email = ?',
        [email]
    )
    return dados[0];
}

const listar = async (id_paciente) => {
   const [dados] = await db.query(
    'SELECT consultas.data, consultas.tipo, consultas.descricao, consultas.status, medicos.nome as medico_nome, pacientes.nome as paciente_nome FROM consultas JOIN medicos ON consultas.id_medico = medicos.id JOIN pacientes ON consultas.id_paciente = pacientes.id WHERE consultas.id_paciente = ?',
     [id_paciente]
    )
    return dados;
}

const cadastrar = async (dados) => {
    const { nome, data_nascimento, sexo, telefone, email, senha } = dados;
    const tipo = 'paciente';
    const resultado = await db.query(
        'INSERT INTO pacientes (nome, data_nascimento, sexo, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, data_nascimento, sexo, telefone, email, senha, tipo]
    )
    return resultado;
}

const agendar = async (dados) => {
    const status = 'agendada';
    const { data, tipo, descricao, id_paciente, id_medico } = dados;
    const res = await db.query('INSERT INTO consultas (data, tipo, descricao, id_paciente, id_medico, status) VALUES (?, ?, ?, ?, ?, ?)',
        [data, tipo, descricao, id_paciente, id_medico, status]
    )
    return res;
}

const medicos = async () => {
    const [res] = await db.query('SELECT id, nome FROM medicos');
    return res;
}

export { login, listar, cadastrar, agendar, medicos };