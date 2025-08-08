import {z} from "zod"

export const RegisterUserSchema = z.object({
    name : z.string().min(1, {message : "User name is required."}),
    email : z.string().min(1, {message : "Email is required."}).email({message : 'Ivalid Email Format'}),
    phone : z.string().min(1, {message : "Phone number is required"}),
    password : z.string().min(6, {message : "Password should be at least 6 characters."})
})