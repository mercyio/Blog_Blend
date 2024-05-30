const express = require('express');
const router = express.Router();
const controllers = require ('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware'); 

// Routes
router.get('/dashboard', userController.getDashboard);
router.get('/add-post', userController.getAddPostPage);
router.post('/add-post', userController.addPost);


module.exports = router;