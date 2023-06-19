import express from 'express';

import * as gradingComponentController from '../controllers/grade/gradingComponent';
import * as gradeController from '../controllers/grade/gradeController';

const router = express.Router();

//Grading Component
router.post('/component', gradingComponentController.createGradingComponent);
router.get(
  '/component/:subject/:grade',
  gradingComponentController.getAllGradingComponentForSpecificSubjectAndGrade
);
router.delete(
  'component/:id',
  gradingComponentController.deleteGradingComponent
);

//Grade
router.post('/',gradeController.createGrade);

export default router;
