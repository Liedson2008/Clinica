import express from 'express';
import medicoController from '../controller/medicoController.js';

const route = express.Router();

route.get('/medico', medicoController.login);
route.get('/medico/:id', medicoController.listarConsultas);
route.post('/medico', medicoController.cadastrarMedico);

export default route;