const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;
/**
 * GET /
 * POST :id
*/

// admin login page
router.get('/admin', async (req, res) => {
   
    try{

        const locals = {
            title: "Admin",
            description: "Simple Blog created with Nodejs, Express and Mongodb."
        }

    res.render('admin/login', {locals, layout: adminLayout});
    }catch(err){
    console.log(err)
    }
})

/**
 * GET /
 * POST :id
*/
// admin check login
router.post('/admin', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if(req.body.username === 'admin' && req.body.password === 'password') {
        res.send('You are logged in.')
      } else {
        res.send('Wrong username or password');
      }
  
    } catch (error) {
      console.log(error);
    }
  });

//   check user login
router.post('/admin', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne( { username } );
  
      if(!user) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if(!isPasswordValid) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      const token = jwt.sign({ userId: user._id}, jwtSecret );
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/dashboard');
  
    } catch (error) {
      console.log(error);
    }
  });


// * POST :id
// */

// admin register
// router.post('/register', async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       try {
//         const user = await User.create({ username, password:hashedPassword });
//         res.status(201).json({ message: 'User Created', user });
//         console.log('created')
//       } catch (error) {
//         if(error.code === 11000) {
//           res.status(409).json({ message: 'User already in use'});
//         }
//         res.status(500).json({ message: 'Internal server error'})
//       }
  
//     } catch (error) {
//       console.log(error);
//     }
//   });

module.exports = router;
