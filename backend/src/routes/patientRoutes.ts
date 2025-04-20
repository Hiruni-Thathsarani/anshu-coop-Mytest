import express from 'express';
import {
    createPatient,
    deletePatient,
    getAllPatients,
    getPatientById,
    updatePatient
} from '../controllers/patientController';

const router = express.Router();

router.post('/create', createPatient);
router.put('/update/:id', updatePatient);
router.delete('/delete/:id', deletePatient);
router.get('/get-all', getAllPatients);
router.get('/get-by-id/:id', getPatientById);


export { router as patientRouter };
