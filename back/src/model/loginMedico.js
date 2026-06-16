import db from '../config/db.js';

const loginMedico = async (email) => {
    const [dados] = await db.query(
        'SELECT * From medico WHERE email = ?',
         [email]);

         return dados[0];
}
export default loginMedico;