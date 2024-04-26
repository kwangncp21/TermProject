const express = require('express');

const {register, login, getMe,logout,deleteUser,getAllUsers} = require('../Controllers/auth');

const router= express.Router();

const {protect,authorize} = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);
router.delete('/:id',protect,authorize('admin'),deleteUser);
router.get('/', protect, authorize('admin'), getAllUsers); 
// router.post('/logout',logout);

module.exports=router;