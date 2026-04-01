import type { Response } from "express";

type JwtUser = {
  getJWTToken: () => string;
};

export const sendToken = (res: Response, user: JwtUser, message: string, statusCode = 200) => {
  const token = user.getJWTToken();

  const option = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    // secure: true,
    sameSite: "none" as const,
  };

  res.status(statusCode).cookie("token", token, option).json({
    sucess: true,
    message,
    user,
    token
  });
};
