import bcrypt from 'bcryptjs'

const saltRounds = 10; 

export const hashPassword = async (password:string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};
