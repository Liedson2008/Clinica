import db from '../config/db.js';

export const loginMedico = async (email, senha) => {
    const [dados] = await db.query(
        'SELECT * From medico WHERE email = ?',
         [email]);

         return dados[0];
}