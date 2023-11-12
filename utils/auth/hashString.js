import bcrypt from 'bcryptjs';

export const hashString = (string) => {
   const seedForHash = bcrypt.genSaltSync(parseInt(process.env.SaltKey));
   
   return bcrypt.hashSync(string, seedForHash);;
};
