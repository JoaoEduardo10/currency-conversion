import jwt from "jsonwebtoken";

export interface IJwt {
  id: string | number;
}

const createJwt = (date: IJwt) => {
  const secretOrPrivateKey = process.env.HASH_JWT as string;

  return jwt.sign(date, secretOrPrivateKey, { expiresIn: "24h" });
};

const validateJwt = (token: string) => {
  const secretOrPrivateKey = process.env.HASH_JWT as string;

  return jwt.verify(token, secretOrPrivateKey);
};

export { createJwt, validateJwt };
