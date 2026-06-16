import loginMedico from '../model/loginMedico.js';

const login = async (req, res) => {
    const {email, senha} = req.body;
    try {
      const medico = await loginMedico(email);
      if(!medico) {
        return res.status(404).json({message: 'Médico nao encontrado'});
      }
      if(medico.senha !== senha) {
        return res.status(401).json({message: 'Senha incorreta'});
      }
      if(medico.senha == senha) {
        return res.status(200).json({message: 'Login bem-sucedido', medico});
      }
    }catch (error){
        console.error('Erro no login do medico: ' , error);
        return res.status(500).json({message: 'Erro no servidor'});
    }
}