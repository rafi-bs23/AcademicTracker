import jwt from 'jsonwebtoken';
export const signToken = async (id: string) => {
  const secret: string = process.env.JWT_SECRET || '';
  const token: string = await jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token;
};
