import { RegisterUserSchema } from "@/lib/schemas/register.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import * as argon2 from 'argon2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") return res.status(405).end();

        const parsedData = RegisterUserSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json(
                {
                    message: "Validation Errors",
                    errors: parsedData.error.flatten().fieldErrors
                }
            )
        }

        const { name, email, phone, password } = parsedData.data;

        const user = await prisma.user.findUnique({
            where: {
                phone,
            }
        });

        if (user) return res.status(200).json({ message: "User already exists." });

        const hashed = await argon2.hash(password);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashed
            }
        });

        return res.status(200).json({ message: "User is registered successfully", user: newUser });
        
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }

}