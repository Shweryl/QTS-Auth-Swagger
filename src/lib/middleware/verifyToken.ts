
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;


export function verifyToken(comingRequest) {
    const authHeader = comingRequest.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) { 
        return null;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }

}