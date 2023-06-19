import express from 'express';

import * as gradingComponent from '../controllers/grade/gradingComponent';

const router = express.Router();

router.post('/', gradingComponent.createGradingComponent);
router.get(
  '/:subject/:grade',
  gradingComponent.getAllGraldingComponentForSpecificSubjectAndGrade
);

export default router;
