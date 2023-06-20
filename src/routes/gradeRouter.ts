import express from 'express';

import * as gradingComponentController from '../controllers/grade/gradingComponent';
import * as gradeController from '../controllers/grade/gradeController';

const router = express.Router();

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
router.post('/', gradeController.createGrade);
router.get('/report-card', gradeController.getReportCard);

export default router;
