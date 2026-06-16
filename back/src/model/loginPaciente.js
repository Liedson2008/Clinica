import db from '..config/db.js';

const loginPaciente = async (email) => {
    const [dados] = await db.query(
        'SELECT * FROM paciente WHERE email = ?',
        [email]
    )
    return dados[0];
}
export default loginPaciente;