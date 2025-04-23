import axios from "axios";
import {Patient} from "../types/patient.ts";

const API_BASE_URL = "http://localhost:5100";
const api = axios.create({
    baseURL: API_BASE_URL,
});
export const patientService = {
    getAllPatients: async () => {
        const response = await api.get<Patient[]>("/patients/get-all");
        return response.data;
    },
    getPatientById: async (id: string) => {
        const response = await api.get<Patient>(`/patients/get-by-id/${id}`);
        return response.data;
    },
    createPatient: async (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
        const response = await api.post<Patient>("/patients/create", patient);
        return response.data;
    },
    updatePatient: async (id: string, patient: Partial<Patient>) => {
        const response = await api.put<Patient>(`/patients/update/${id}`, patient);
        return response.data;
    },
    deletePatient: async (id: string) => {
        await api.delete(`/patients/delete/${id}`);
    },
};