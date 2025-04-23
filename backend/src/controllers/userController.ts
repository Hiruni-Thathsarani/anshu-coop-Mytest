/*
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response):Promise<any>  => {
    const { userName, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { userName } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "User created", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error });
    }
};

export const signin = async (req: Request, res: Response): Promise<any>  => {
    const { userName, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { userName } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // For now, just respond with success. Later, add JWT here.
        res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Signin failed", error });
    }
};
*/
