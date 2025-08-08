import { prisma } from "@/lib/prisma";
import { LoginUserSchema } from "@/lib/schemas/login.schema";
import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from 'argon2';
import { createToken } from "@/lib/JwtToken/token";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") return res.status(405).end();

        const parsedData = LoginUserSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json(
                {
                    message: "Validation Errors",
                    errors: parsedData.error.flatten().fieldErrors
                }
            )
        }

        const { phone, password } = parsedData.data;

        const user = await prisma.user.findUnique({
            where: {
                phone
            }
        });

        if (!user) return res.status(404).json({ message: "User not found." });

        const isValidPassword = await argon2.verify(user.password, password);

        if(!isValidPassword) return res.status(401).json({message : "Invalid Credentials."});

        const token = createToken(user);

        return res.status(200).json({message : "Login Successfully", token});


    } catch (error) {
        return res.status(500).json({message :'Internal Server Error.'})
    }
}