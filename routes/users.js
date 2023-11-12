import express from 'express';
import { updateUser, deleteUser, getOneUser, getAllUsers, } 
  from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/auth/verifyToken.js';
import defaultHandler from '../controllers/defaultHandler.js';

const router = express.Router();

export default router;


// // For testing the authentication and authorization
// Authenticate User
router.get('/checkauthentication', verifyUser, defaultHandler((req, res, next) => {
  res.json({ message: 'Hello user, you are logged in' });
}));

// Authorize User
router.get('/checkuser/:id', verifyUser, defaultHandler((req, res, next) => {
  res.json({ message: 'Hello user, you are logged in and authorized for this' });
}));

// Authorize Admin
router.get('/checkadmin/:id', verifyAdmin, defaultHandler((req, res, next) => {
  res.json({ message: 'Hello user, you are logged in and authorized for everything' });
}));

router.post('/:id', verifyUser, defaultHandler(updateUser));

router.post('/:id', verifyUser, defaultHandler(deleteUser));

router.get('/:id', verifyUser, defaultHandler(getOneUser));

router.get('/', verifyAdmin, defaultHandler(getAllUsers));
