export const generateForgotPasswordLink = (host, baseUrl, userEmail, hashKey) => {
   const emailEncoded = encodeURIComponent(userEmail);
   const hashKeyEncoded = encodeURIComponent(hashKey);
   return `${host}${baseUrl}?email=${emailEncoded}&hashForResetPassword=${hashKeyEncoded}`;
};