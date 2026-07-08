import express from 'express';
import medicoController from '../controller/medicoController.js';
import pacienteController from '../controller/pacienteController.js';

const route = express.Router();

route.post('/medico/login', medicoController.loginMedico);
route.post('/medico/cadastrar', medicoController.cadastrarMedico);
route.post('/paciente/login', pacienteController.loginPaciente)
route.post('/paciente/cadastrar', pacienteController.cadastrarPaciente);
route.get('/medico/pacientes', medicoController.listarPacientes);
route.post('/medico/agendar', medicoController.agendarConsulta);
route.get('/paciente/medicos', pacienteController.listarMedicos);
route.post('/paciente/agendar', pacienteController.agendarConsulta);
route.get('/medico/:id', medicoController.listarConsultas);
route.get('/paciente/:id', pacienteController.listarConsultas);

export default route;