import { Router } from 'express';

import IsAuthenticated from '../middleware/IsAuthenticated';

import * as StreamController from '../controllers/stream';
import * as TeamController from '../controllers/team';
import * as EmployeeController from '../controllers/employee';
import * as VacantionApplicationController from '../controllers/vacantionApplication';
import * as VacantionPlanController from '../controllers/vacantionPlan';
import * as AuthController from '../controllers/auth';
import * as ProfileController from '../controllers/profile';
import * as SkillsController from '../controllers/skill';
import cors from 'cors';

const router = Router();
const allowedUrls = ['http://localhost:3000']
const options: cors.CorsOptions = {
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: allowedUrls,
};
router.use(cors(options));

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);

router.post('/profile', IsAuthenticated, ProfileController.create);

router.post('/skill', IsAuthenticated, SkillsController.create);
router.get('/skills', IsAuthenticated, SkillsController.getAll);

router.get('/streams/', IsAuthenticated, StreamController.getAll);
router.get('/stream/:id', IsAuthenticated, StreamController.getById);
router.post('/stream/', IsAuthenticated, StreamController.create);

router.get('/teams/', IsAuthenticated, TeamController.getAll);
router.get('/team/:id', IsAuthenticated, TeamController.getById);
router.post('/team/', IsAuthenticated, TeamController.create);

router.get('/employees/', IsAuthenticated, EmployeeController.getAll);
router.get('/employee/:id', IsAuthenticated, EmployeeController.getById);

router.post('/vacantion_application', IsAuthenticated, VacantionApplicationController.create);
router.post(
  '/vacantion_application/:id/approve',
  IsAuthenticated,
  VacantionApplicationController.approve
);
router.get('/vacantion_application', IsAuthenticated, VacantionApplicationController.get);
router.get('/vacantion_applications', IsAuthenticated, VacantionApplicationController.getAll);

router.post('/vacantion_plan', IsAuthenticated, VacantionPlanController.create);
router.get('/vacantion_plan', IsAuthenticated, VacantionPlanController.get);

export default router;
