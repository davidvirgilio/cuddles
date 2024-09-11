import jwt from 'jsonwebtoken'

export function generateResetToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  }
  
export function verifyResetToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
