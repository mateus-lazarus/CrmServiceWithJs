import createError from '../utils/responses/errors/createError.js';

export const errorHandler = {
   environment: 'prod',

   defineEnv: function (envName) {
      this.environment = envName;
      return this;
   },

   active: (error, req, res, next) => {
      const errorStatus = error.status || 500;
      const errorMessage = error.message || 'Something went wrong';
   
      const errorObject = createError(errorStatus, errorMessage);

      let stackTrace;

      // ajuda!!
      // if (this.environment === 'prod') {
      if ('dev' !== 'prod') {
         stackTrace = error.stack;
      }

      return res
         .status(errorStatus)
         .json({
            success: errorObject.success,
            status: errorObject.status,
            message: errorObject.message,
            stackTrace: stackTrace,
         });
   }
};
