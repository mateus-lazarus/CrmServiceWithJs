import jwt from 'jsonwebtoken';
import { createError } from '../responses/errors/createError.js';

export const verifyToken = (req, res, next) => {
  try {
    req.user = returnTokenData(req);
    return;
  }
  catch (error) {
    return next(error);
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      return next();
    }
    else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      return next();
    }
    
    else {
      return next(createError(403, 'You are not a administrator'));
    }
  });
};

export const verifyRole = (role, req, res, next) => {
  verifyToken(req, res, next);

  if (req.user.isAdmin) {
    return;
  }

  if (doesHaveRole(req.user.roles, role)) {
    //req.user = null;
    return;
  }
    
  else {
    throw createError(403, 'You are not authorized');
  }
};

export const returnTokenData = (req) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw createError(401, 'You are not authenticated');
  }

  jwt.verify(token, process.env.JWT, (error, userData) => {
    if (error) {
      throw createError(403, 'Token is not valid');
    }

    req.user = userData;
  });

  return req.user;
};

export const doesHaveRole = (userRoles, expectedRole) => {
  return userRoles.includes(expectedRole);
};
