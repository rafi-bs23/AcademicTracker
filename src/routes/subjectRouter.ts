import express from 'express';

import * as subjectController from '../controllers/subjectController';

const router = express.Router();

router.get('/:class', subjectController.findAllSubjectInOneClass);
router.post('/', subjectController.createSubject);
router.patch('/:id', subjectController.updateSubjectById);
router.delete('/:id', subjectController.deleteSubjectById);

export default router;
