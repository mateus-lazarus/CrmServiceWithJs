import { hashString } from './hashString.js';

export const generateForgotPasswordHash = async (email, user) => {
   const forgotPasswordHash = hashString(email);

   user.resetPasswordToken = forgotPasswordHash;
   await user.save();

   return forgotPasswordHash;
};