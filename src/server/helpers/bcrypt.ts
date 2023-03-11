import bcrypt from "bcryptjs";

const createPassowrdHash = async (password: string) => {
  const salt = await bcrypt.genSalt(8);

  return await bcrypt.hash(password, salt);
};

const validatePassowdHash = async (password: string, passowrdHash: string) => {
  return await bcrypt.compare(password, passowrdHash);
};

export { createPassowrdHash, validatePassowdHash };
