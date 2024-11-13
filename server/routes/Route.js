import express from 'express';
import { register, login, logout, getOtherUsers } from '../controllers/userController.js';

import { isAuthenticated, isUser, isAdmin, isClerk } from '../middleware/isAuthenticated.js';


console.log("Route.js loaded");

const router = express.Router();

// user routes
router.route('/user/register').post(register); //working
router.route('/user/login').post(login); //working
router.route('/user/logout').get(logout); //working
router.route('/user/getOtherUsers').get(isAuthenticated, isAdmin, getOtherUsers); //working


export default router;