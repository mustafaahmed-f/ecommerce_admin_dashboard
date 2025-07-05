import { jwtVerify, SignJWT } from "jose";

const encoder = new TextEncoder();

export const signToken = async ({
  payload = {},
  signature = `${process.env.SIGNATURE}`,
  expiresIn = "1d",
}: {
  payload?: any;
  signature?: string;
  expiresIn?: string | number;
}) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encoder.encode(signature));
};

export const verifyToken = async ({
  token = "",
  signature = `${process.env.SIGNATURE}`,
} = {}) => {
  if (!token) {
    throw new Error("Token is required to verify !", { cause: 400 });
  }
  const { payload } = await jwtVerify(token, encoder.encode(signature));
  return payload;
};
