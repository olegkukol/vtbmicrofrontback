import { Router } from 'express';

import * as StreamController from '../controllers/stream';
import * as TeamController from '../controllers/team';
import * as EmployeeController from '../controllers/employee';
import * as VacantionApplicationController from '../controllers/vacantionApplication';

const router = Router();

router.get('/streams/', StreamController.getAll);
router.get('/stream/:id', StreamController.getById);
router.post('/stream/', StreamController.create);

router.get('/teams/', TeamController.getAll);
router.get('/team/:id', TeamController.getById);
router.post('/team/', TeamController.create);

router.get('/employees/', EmployeeController.getAll);
router.post('/employee/', EmployeeController.create);
router.get('/employee/:id', EmployeeController.getById);

router.get('/vacation_application', VacantionApplicationController.create);

export default router;
