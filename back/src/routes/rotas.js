import express from 'express';
import medicoController from '../controller/medicoController.js';

const route = express.Router();

route.post('/medico/login', medicoController.login);
route.get('/medico/:id', medicoController.listarConsultas);
route.post('/medico', medicoController.cadastrarMedico);

export default route;