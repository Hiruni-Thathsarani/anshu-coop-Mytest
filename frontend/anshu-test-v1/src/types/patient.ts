export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string; // ISO string format
    status: "Active" | "Inactive";
    createdAt: string;
    updatedAt: string;
}