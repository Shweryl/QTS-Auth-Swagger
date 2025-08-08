
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest } from "next";

const JWT_SECRET = process.env.JWT_SECRET!;


export function verifyToken(comingRequest: NextApiRequest): JwtPayload & { id: string } | null {
    const authHeader = comingRequest.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === "string") {
            return null;
        }

        if (!decoded.id) {
            return null;
        }

        return decoded as JwtPayload & { id: string };
    } catch (error) {
        return null;
    }

}