import express from 'express';
import medicoController from '../controller/medicoController.js';
import pacienteController from '../controller/pacienteController.js';

const route = express.Router();

route.post('/medico/login', medicoController.loginMedico);
route.get('/medico/:id', medicoController.listarConsultas);
route.post('/medico/cadastrar', medicoController.cadastrarMedico);
route.post('/paciente/login', pacienteController.loginPaciente)
route.get('/paciente/:id', pacienteController.listarConsultas);
route.post('/paciente/cadastrar', pacienteController.cadastrarPaciente);

export default route;