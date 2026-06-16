import db from '../config/db.js';

const listar = async () => {
    const [dados] = await db.query(
        'SELECT * FROM consultas WHERE id_medico = ?',
        [id_medico]
    );
}

const cadastrar = async (dados) => {
    const {nome, idade, sexo,telefone, email, especialidade, crm, senha, tipo}
}