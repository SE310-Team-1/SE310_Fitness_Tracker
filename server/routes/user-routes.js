import express from 'express';
import userController from '../controllers/user-controller.js';

const router = express.Router();

router.post("/login" , userController.logUserIn);

router.post("/signup" , userController.signUserUp);

router.post('/logout' , userController.logUserOut);


export default router