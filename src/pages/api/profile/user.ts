import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/middleware/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res:NextApiResponse){
    const decodedToken = verifyToken(req);

    if (!decodedToken) {
        return res.status(403).json({ message: "Unauthorized" });
    }


    const user = await prisma.user.findFirst({
        where : {
            id : Number(decodedToken.id),
        }
    }); 

    return res.status(200).json({message : "Fetched user info successfully", user})
}