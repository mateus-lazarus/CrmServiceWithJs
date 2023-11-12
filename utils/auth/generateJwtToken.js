import jwt from 'jsonwebtoken';

export const generateJwtToken = async (user) => {
   const token = jwt.sign(
     { id: user.id, isAdmin: user.isAdmin, roles: user.roles },
     process.env.JWT,
     { expiresIn: '24h' }
   );

   user.lastTokenSent = token;
   await user.save();

   return token;
};
