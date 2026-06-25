import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const registrationSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 characters long"),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
})

const loginSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
})

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const result = registrationSchema.safeParse(req.body);
    if(!result.success) {
        res.status(400).json({ errors: result.error.flatten().fieldErrors });
        return;
    }
    next();
}

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const result = loginSchema.safeParse(req.body);
    if(!result.success) {
        res.status(400).json({ errors: result.error.flatten().fieldErrors });
        return;
    }
    next();
}