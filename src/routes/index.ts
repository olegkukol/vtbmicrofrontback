import { Router } from 'express';

import IsAuthenticated from '../middleware/IsAuthenticated';

import * as StreamController from '../controllers/stream';
import * as TeamController from '../controllers/team';
import * as EmployeeController from '../controllers/employee';
import * as VacantionApplicationController from '../controllers/vacantionApplication';
import * as AuthController from '../controllers/auth';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);

router.get('/streams/', IsAuthenticated, StreamController.getAll);
router.get('/stream/:id', IsAuthenticated, StreamController.getById);
router.post('/stream/', IsAuthenticated, StreamController.create);

router.get('/teams/', IsAuthenticated, TeamController.getAll);
router.get('/team/:id', IsAuthenticated, TeamController.getById);
router.post('/team/', IsAuthenticated, TeamController.create);

router.get('/employees/', IsAuthenticated, EmployeeController.getAll);
router.get('/employee/:id', IsAuthenticated, EmployeeController.getById);

router.get('/vacation_application', IsAuthenticated, VacantionApplicationController.create);

export default router;
