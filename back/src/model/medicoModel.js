import db from '../config/db.js';

const login = async (email) => {
    const [dados] = await db.query(
        'SELECT id, senha, tipo From medicos WHERE email = ?',
         [email]);

         return dados[0];
}

const listar = async (id_medico) => {
    const [dados] = await db.query(
        'SELECT consultas.id, consultas.data, consultas.tipo, consultas.descricao, consultas.id_paciente, consultas.status, medicos.nome as medico_nome, pacientes.nome as paciente_nome FROM consultas JOIN medicos ON consultas.id_medico = medicos.id JOIN pacientes ON consultas.id_paciente = pacientes.id WHERE consultas.id_medico = ?',
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

const agendar = async (dados) => {
    const status = 'agendada';
    const { data, tipo, descricao, id_paciente, id_medico } = dados;
    const res = await db.query('INSERT INTO consultas (data, tipo, descricao, id_paciente, id_medico, status) VALUES (?, ?, ?, ?, ?, ?)',
        [data, tipo, descricao, id_paciente, id_medico, status]
    )
    return res;
}

const pacientes = async () => {
    const [res] = await db.query('SELECT id, nome FROM pacientes');
    return res;
}

const editar = async (req) =>{
    const { id, data, tipo, descricao, id_paciente, status } = req.body;
    try {
        const res = await db.query('UPDATE consultas SET data = ?, tipo =?, descricao = ?, id_paciente = ?, status = ? WHERE id = ?',
            [data, tipo, descricao, id_paciente, status, id]
        )
        return res;
    }catch (error) {
        console.error('erro ao editar consulta: ', error);
    }
}

export {login, listar, cadastrar, agendar, pacientes, editar};