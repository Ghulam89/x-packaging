import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";

type AuthenticatedRequest = Request & { userId?: string };

const AuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get?.("Authorization");
    if (!req || !req.get || !authHeader) {
        return res.status(401).json({ message: "Not authorized bearer token is not present" });
    }
    
    const token = authHeader.split(" ")[1];
    let decodedToken: { userId?: string } | null = null;
    try {
        decodedToken = jwt.verify(token, "somesecretsecret") as { userId?: string };
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
    
    if (!decodedToken) {
        return res.status(401).json({ message: "Not authorized" });
    }
    
    req.userId = decodedToken.userId;
    next();
};

export default AuthMiddleware;
