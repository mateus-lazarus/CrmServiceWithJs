import User from '../../models/User.js';
import { createError } from '../responses/errors/createError.js';

export const findUserById = async (id) => {
   try {
      return await User.findById(id);
   }
   catch (error) {
      throw createError(404, 'User id doesn\'t exist');
   }
};

export const findUserByEmail = async (email) => {
   try {
      const user = await User.findOne({ email: email });

      if (!user) {
         throw createError(404, 'User query gone wrong or user doesn\'t exist');
      }

      return user;
      
   }
   catch (error) {
      throw createError(404, 'User email doesn\'t exist');
   }
};

export const findUser = async (queryParams) => {
   try {
      const user = await User.findOne(queryParams);

      if (!user) {
         throw createError(404, 'User query gone wrong or user doesn\'t exist');
      }

      return user;
   }
   catch (error) {
      throw createError(404, 'User query gone wrong or user doesn\'t exist');
   }
};

export const listUsers = async (queryParams) => {
   try {

      const user = await User.findOne(queryParams)

      if (!user) {
         throw createError(404, 'User query gone wrong or user doesn\'t exist');
      }

      return user;
   }
   catch (error) {
      throw createError(404, 'Users query or something gone wrong');
   }
};

export const addUser = async (user) => {
   try {
      const newUser = new User(user);

      await newUser.save();
   }
   catch (error) {
      throw createError(404, 'User id doesn\'t exist');
   }
};

export const updateUserById = async (id, updatedUser) => {
   try {
      const user = await findUserById(id);

      user.updateOne(updatedUser);
   }
   catch (error) {
      throw createError(404, 'User can\'t be updated');
   }
};

export const deleteUserById = async (id) => {
   try {
      const user = await user.findByIdAndDelete(id);
   }
   catch (error) {
      throw createError(404, 'User id doesn\'t exist or cannot be deleted');
   }
};
