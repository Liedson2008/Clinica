import loginPaciente from '../model/loginPaciente.js';

const login = async (req, res) => {
    const {email, senha} = req.body;
    try {
        const paciente = awaitloginPaciente(email);

        if(!paciente) {
            return res.status(404).json({message: 'Paciente nao encontrado'});
        }
        if(paciente.senha !== senha) {
            return res.status(401).json({message: 'Senha incorreta'});
        }
        if(paciente.senha == senha) {
            return res.status(200).json({message: 'Login bem-sucedido', paciente});
        }
    }catch (error) {
        console.error('Erro no login do paciente: ', error);
        return res.status(500).json({message: 'Erro no servidor'});
    }
}