import { hashString } from '../utils/auth/hashString.js';
import { passwordVerifier } from '../utils/auth/passwordVerifier.js';
import { generateJwtToken } from '../utils/auth/generateJwtToken.js';
import User from '../models/User.js';
import { findUserByEmail, findUser, addUser } from '../utils/repositories/userRepository.js';
import { generateForgotPasswordHash } from '../utils/auth/generateForgotPasswordHash.js';
import { generateForgotPasswordLink } from '../utils/auth/generateForgotPasswordLink.js';
import { resetPasswordWithKey } from '../utils/auth/resetPasswordWithKey.js';
import { verifyRole } from '../utils/auth/verifyToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const hashPassword = hashString(req.body.password);

    await addUser(
      new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: req.body.roles
      })
    );

    return res
      .status(201)
      .json({ message: 'User has been created' });
  }
  catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await findUser({ username: req.body.username });
    
    await passwordVerifier(req.body.password, user);

    const token = await generateJwtToken(user);

    return res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        username: user.username,
        email: user.email,
        roles: user.roles,
        lastTokenSent: user.lastTokenSent
      });
  }
  catch (error) {
    return next(error);
  }
};

export const createResetPasswordHash = async (req, res, next) => {
  try {
    verifyRole('auth:reset:password', req, res, next);

    const user = await findUserByEmail(req.query.email);

    const hashForResetKey = await generateForgotPasswordHash(req.query.email, user);

    const resetPasswordLink = generateForgotPasswordLink(
      req.headers.host,
      `${req.baseUrl}/reset/password`,
      req.query.email,
      hashForResetKey
    );

    // Lacking of stmp client for now
    // emailSender(req.query.email, 'Reset Password Link', resetPasswordLink);

    return res
      .status(200)
      .json({
        message: 'Link for hash for reset password',
        resetToken: hashForResetKey,
        resetTokenLink: resetPasswordLink
      });
  }
  catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    verifyRole('auth:reset:password', req, res, next);

    const user = await findUserByEmail(req.query.email);

    await resetPasswordWithKey(req.query.hashForResetPassword, req.body.newPassword, user);

    return res
      .status(202)
      .json({
        message: 'Password updated with success'
      });
  }
  catch (error) {
    return next(error);
  }
};
