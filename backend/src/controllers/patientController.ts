// src/controllers/patientController.ts
import { Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

// Create Patient
export const createPatient = async (req: Request, res: Response): Promise<any> => {

    const { name, dateOfBirth, status } = req.body;
    console.log('Calling createPatient controller',dateOfBirth,name,status);
    if (!name || !dateOfBirth || !status) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const patient = await prisma.patient.create({
            data: {
                name,
                dateOfBirth: new Date(dateOfBirth),
                status: status.toUpperCase(),
            },
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create patient' });
    }
};

// Get All Patients
export const getAllPatients = async (req: Request, res: Response): Promise<any> => {
    try {
        const patients = await prisma.patient.findMany();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

// Get Single Patient by ID
export const getPatientById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(id) },
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
};

// Update Patient
export const updatePatient = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { name, dateOfBirth, status } = req.body;

    try {
        const updatedPatient = await prisma.patient.update({
            where: { id: parseInt(id) },
            data: {
                name,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                status: status ? status.toUpperCase() : undefined,
            },
        });

        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patient' });
    }
};

// Delete Patient
export const deletePatient = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        await prisma.patient.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};
