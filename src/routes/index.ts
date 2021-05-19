import { Router } from 'express';

import IsAuthenticated from '../middleware/IsAuthenticated';
import checkPermissions from '../middleware/checkPermissions';

import * as StreamController from '../controllers/stream';
import * as TeamController from '../controllers/team';
import * as EmployeeController from '../controllers/employee';
import * as VacantionApplicationController from '../controllers/vacantionApplication';
import * as VacantionPlanController from '../controllers/vacantionPlan';
import * as AuthController from '../controllers/auth';
import * as ProfileController from '../controllers/profile';
import * as SkillsController from '../controllers/skill';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);

router.post('/profile', IsAuthenticated, ProfileController.create);
router.get('/profile', IsAuthenticated, ProfileController.get);

router.post('/skill', IsAuthenticated, SkillsController.create);
router.get('/skills', IsAuthenticated, SkillsController.getAll);

router.get('/streams/', IsAuthenticated, StreamController.getAll);
router.get('/stream/:id', IsAuthenticated, StreamController.getById);
router.get('/stream/:id/teams', IsAuthenticated, StreamController.getTeams);
router.post('/stream/', IsAuthenticated, StreamController.create);

router.get('/teams/', IsAuthenticated, TeamController.getAll);
router.get('/team/:id', IsAuthenticated, TeamController.getById);
router.post('/team/', IsAuthenticated, TeamController.create);

router.get('/employees/', IsAuthenticated, EmployeeController.getAll);
router.get(
  '/employees/vacantion_applications',
  IsAuthenticated,
  checkPermissions,
  VacantionApplicationController.getAll
);
router.get('/employee/:id', IsAuthenticated, EmployeeController.getById);

router.post('/vacantion_application', IsAuthenticated, VacantionApplicationController.create);
router.post(
  '/vacantion_application/:id/approve',
  IsAuthenticated,
  checkPermissions,
  VacantionApplicationController.approve
);
router.get('/vacantion_applications', IsAuthenticated, VacantionApplicationController.get);

router.post('/vacantion_plan', IsAuthenticated, VacantionPlanController.create);
router.get('/vacantion_plan', IsAuthenticated, VacantionPlanController.get);

export default router;
