import {
  findUserById, updateUserById, listUsers, deleteUserById
} from '../utils/repositories/userRepository.js';
import { verifyRole } from '../utils/auth/verifyToken.js';

export const updateUser = async (req, res, next) => {
  try {
    verifyRole('user:update', req, res, next);

    await updateUserById(req.params.id, req.body);

    return res.status(200);
  }
  catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    verifyRole('user:delete', req, res, next);

    await deleteUserById(req.params.id);

    return res.status(200);
  }
  catch (error) {
    return next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    verifyRole('user:get', req, res, next);

    const user = await findUserById(req.params.id);

    return res.status(200).json(user);
  }
  catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    verifyRole('user:get:all', req, res, next);

    const userList = await listUsers();

    return res.status(200).json(userList);
  }
  catch (error) {
    return next(error);
  }
};
