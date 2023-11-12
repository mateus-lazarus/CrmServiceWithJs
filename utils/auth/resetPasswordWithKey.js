import { hashString } from './hashString.js';
import { createError } from '../responses/errors/createError.js';

export const resetPasswordWithKey = async (keyHash, newPassword, user) => {
   if (keyHash !== user.resetPasswordToken || user.resetPasswordToken === null) {
      return next(createError(406, 'Hash for password does not accepted!'));
   }

   user.resetPasswordToken = null;
   user.password = hashString(newPassword);

   await user.save();
};