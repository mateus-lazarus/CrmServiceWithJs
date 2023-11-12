const defaultHandler = (controller) => (req, res, next) => {
   try {
      controller(req, res, next);
   }
   catch (error) {
      return next(error);
   }
};

export default defaultHandler;
