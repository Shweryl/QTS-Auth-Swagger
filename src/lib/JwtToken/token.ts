import jwt from "jsonwebtoken";


export function createToken(user: { id: number | string; email: string }) {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    )

    return token;
}
