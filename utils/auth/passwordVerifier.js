import bcrypt from 'bcryptjs';
import createError from '../responses/errors/createError.js';

export const passwordVerifier = async (requestPassword, user) => {
   const doesPasswordMatch = await bcrypt.compare(requestPassword, user.password);

   if (doesPasswordMatch) {
      return;
   }
   
   throw createError(404, 'Password does not match!');
};
