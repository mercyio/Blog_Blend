const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')


router.get('/register', adminController.renderRegisterPage);

router.post('/register', adminController.register);

router.get('/admin', adminController.renderLoginPage);

router.post('/admin', adminController.login)

router.get('/dashboard', adminController.dashboard)

router.get('/add-post', adminController.addPost)

router.post('/add-post', adminController.createPost)

router.get('/edit-post/:id', adminController.editPost)

router.put('/edit-post/:id', adminController.edit)

router.delete('/delete-post/:id', adminController.deletePost)

router.get('/logout', adminController.logout)

router.get('/articles', adminController.articles)

module.exports = router;








// /**
// */ 
// // check login middleware
// const authMiddleware = (req, res, next ) => {
//     const token = req.cookies.token;
  
//     if(!token) {
//       return res.status(401).json( { message: 'Unauthorized'} );
//     }
  
//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       req.userId = decoded.userId;
//       next();
//     } catch(error) {
//       res.status(401).json( { message: 'Unauthorized'} );
//     }
//   }

/**
 * GET /
 * POST :id
*/
// admin login page
// router.get('/admin', async (req, res) => {
   
//     try{

//         const locals = {
//             title: "Admin",
//             description: "Simple Blog created with Nodejs, Express and Mongodb."
//         }

//     res.render('admin/login', {locals, layout: adminLayout});
//     }catch(err){
//     console.log(err)
//     }
// })

/**
 * GET /
 * POST :id
*/
// admin register page
// router.get('/register', adminController.register, async (req, res) => {
   
//   try{

//       const locals = {
//           title: "Admin",
//           description: "Simple Blog created with Nodejs, Express and Mongodb."
//       }

//   res.render('admin/register', {locals, layout: adminLayout});
//   }catch(err){
//   console.log(err)
//   }
// })

// /**
//  * GET /
//  * POST :id
// */
// // admin check login
// // router.post('/admin', async (req, res) => {
// //     try {
// //       const { username, password } = req.body;
      
// //       if(req.body.username === 'admin' && req.body.password === 'password') {
// //         res.send('You are logged in.')
// //       } else {
// //         res.send('Wrong username or password');
// //       }
  
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   });

// //   check admin login 2
// router.post('/admin', async (req, res) => {
//     try {
//       const { username, password } = req.body;
      
//       const user = await User.findOne( { username } );
  
//       if(!user) {
//         return res.status(401).json( { message: 'Invalid credentials' } );
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
  
//       if(!isPasswordValid) {
//         return res.status(401).json( { message: 'Invalid credentials' } );
//       }
  
//       const token = jwt.sign({ userId: user._id}, jwtSecret );
//       res.cookie('token', token, { httpOnly: true });
//       res.redirect('/dashboard');
  
//     } catch (error) {
//       console.log(error);
//     }
//   });


// * POST :id
// */

// user register
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//       const user = await User.create({ username, password: hashedPassword });
//       res.redirect('/dashboard');
//     } catch (error) {
//       if (error.code === 11000) {
//         res.status(409).json({ message: 'User already in use' });
//       } else {
//         res.status(500).json({ message: 'Internal server error' });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// /**
//  * GET /
//  * Admin Dashboard
// */
// router.get('/dashboard', async (req, res) => {
//   try {

//     const userId = req.user._id
//       const locals = {
//         title: 'Dashboard',
//         description: 'Simple Blog created with NodeJs, Express & MongoDb.'
//       }
//       const data = await Post.findOne({userId})
//       res.render('admin/dashboard', {
//         locals,
//         data,
//         layout: adminLayout
//       });
  
//     } catch (error) {
//       console.log(error);
//     }
  
//   });


/** 
 * GET /
 * Admin Create new post
*/
// router.get('/add-post', authMiddleware, async (req, res) => {
//     // const userId = req.user._id
//     try {
//       const locals = {
//         title: 'Add Post',
//         description: 'Simple Blog created with NodeJs, Express & MongoDb.',
//       }
  
//       const data = await Post.find();
//       res.render('admin/add-post', {
//         // userId,
//         locals,
//         layout: adminLayout
//       });
  
//     } catch (error) {
//       console.log(error);
//     }
  
//   });

  /**
 * Post /
 * Admin Create new post
*/
// router.post('/add-post', authMiddleware, async (req, res) => {
  
//   try {
//           const userId = req.user._id
//             const newPost = new Post({
//                 title: req.body.title,
//               body: req.body.body,
//               userId: userId
//             });
//             await Post.create(newPost, userId );
//             res.redirect('dashboard');
 
//         } catch (error) {
//     }

//    })

    /** 
 * GET /
 * Admin Create new post
*/
  // router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  //   try {
      
  //       const locals = {
  //           title: 'Add Post',
  //           description: 'Simple Blog created with NodeJs, Express & MongoDb.'
  //         }

  //      const data = await Post.findOne({ _id: req.params.id });
  //      res.render('admin/edit-post', {
  //       data,
  //       locals,
  //       layout: adminLayout

  //      })
  //       res.redirect(`/edit-post/${req.params.id}`)

  //   } catch (error) {
  //     console.log(error);
  //   }
  
  // });

   /**
 * PUT /
 * Admin Create new post
*/
// router.put('/edit-post/:id', authMiddleware, async (req, res) => {
//     try {
  
//       await Post.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         body: req.body.body,
//         updatedAt: Date.now()
//       });
//     //   res.redirect(`/edit-post/${req.params.id}`);
//     res.redirect('/dashboard');
  
  
//     } catch (error) {
//       console.log(error);
//     }
  
//   });


  /**
 * DELETE /
 * Admin - Delete Post
*/
// router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

//     try {
//       await Post.deleteOne( { _id: req.params.id } );
//       res.redirect('/dashboard');
//     } catch (error) {
//       console.log(error);
//     }
  
//   });

//   /**
//  * GET /
//  * Admin Logout
// */
// router.get('/logout', (req, res) => {
//     res.clearCookie('token');
//     //res.json({ message: 'Logout successful.'});
//     res.redirect('/');
//   });

 