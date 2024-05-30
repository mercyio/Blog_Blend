const User = require('../models/user')
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET;
const adminLayout = '../views/layouts/admin';

// check login middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret); 
        req.userId = decoded.userId;
        console.log(req.userId)
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }

  //  render login page
const renderLoginPage = (async (req, res) => { 
    try {
        const locals = {
            tittle: "Admin",
            description: "SImple Blog with Node, Express and Mongodb"
        }
        res.render( 'admin/login', {locals, layout:adminLayout})
    } catch (error) {
        return error
    }
})

const renderRegisterPage = async  (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with Nodejs, Express and Mongodb."
        };
        res.render('admin/register', { locals, layout:adminLayout });  
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// user register
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });
        await user.save()
        res.redirect('/dashboard')
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Username already in use' });
        } else {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
};


   const login = (async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if(req.body.username === 'admin' && req.body.password === 'password') {
       res.redirect('dashboard')
      } else {
       res.redirect('/')
      }
  
    } catch (error) {
      console.log(error);
    }
  });

//  login page
// const login = (async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username })
         
//         if (!user) {
//             alert("oops! seems you don't have an account yet!")
//             res.redirect('/admin')
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {

//             return res.status(401).json( { message: "invalid credentials"})
//         } 

//         const token = jwt.sign({ userId: user._id }, jwtSecret)
//         res.cookie('jwt', token, {httpOnly: true})
//         res.redirect('/dashboard')
//     } catch (error) {
//         return error
//    }
// })

const dashboard = ( authMiddleware, async (req, res) => {
    try {
            const locals = {
                title: 'Dashboard',
                description : 'Simple blog created with node, Express and mongodb'
            }
                const data = await Post.find();
                res.render('admin/dashboard', {locals, data, layout:adminLayout})
        } catch (error) {
            console.log(error); 
        } 
})
     
     
//  * Admin Create new post GET
const addPost = (authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'Simple blog create with express and mongodb'
        }
        const data = await Post.find();
        res.render('admin/add-post', { locals, data, layout: adminLayout})
    } catch (error) {
        console.log(error)
    }
})

// create post POST
//  * Admin Create new post POST
const createPost = (authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;
        const newPost = new Post({ title, body, userId: req.userId });
        // await Post.create(newPost)
        await newPost.save(); 
        res.redirect('dashboard');
    } catch (error) {
        console.log(error);
    }
});

// edit post GET
const editPost = (authMiddleware, async (req, res) => {
    try {
        const locals = {
            tittle: 'Add Post',
            description: 'Simple blog mae with express and mongodb'
        }
        const data = await Post.findOne({ _id: req.params.id })
        res.render('admin/edit-post', {
            data,
            locals,
            layout: adminLayout
        })
        res.redirect('/edit-post/${req.params.id}')
    } catch (error) {
        console.log(error)
    }
})

// edit post PUT
const edit = (authMiddleware, async (req, res) => {
    try {
       await Post.findByIdAndUpdate(req.params.id,
     {
        title: req.body.title,
         body: req.body.body,
        isEdited: true,
        createdAt: Date.now()
     }) 
    res.redirect('/dashboard')    
    } catch (error) {
    console.log(error)
 }
})

// delete post 
const deletePost = (authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})

// logout
const logout = (authMiddleware, async (req, res) => {
    try {
        res.clearCookie('token')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}) 
const articles = async (req, res) => {
    try {
        const locals = {
            title: 'Articles',
            description: 'Simple blog made with express and mongodb'
        };
        const limit = 10; // number of posts per page
        const page = req.query.page? parseInt(req.query.page) : 1;
        const skip = (page - 1) * limit;
        const count = await Post.countDocuments();
        const pages = Math.ceil(count / limit);
        const data = await Post.find().skip(skip).limit(limit);
        const nextPage = page < pages? page + 1 : null;
        res.render('admin/articles', {
            data,
            locals,
            layout: adminLayout,
            nextPage
        });
    } catch (error) {
        console.log(error);
    }
};
    

// const adminLogin = (async (req, res) {
//     const { username, password } = req.body
//     const user = await User.findOne({ username })

//     if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' })
//     }

//     const ifPasswordValid = await bcrypt.compare(password, user.password);
//     if (!ifPasswordValid) {
//         return res.status(401).json( { message: "invalid credentials"})
//     }
//     const token = jwt.sign({ userId: user._id }, jwtSecret)
//     res.cookie('jwt', token, {httpOnly: true})
//     res.redirect('/dashboard')
// })



module.exports = {
    register,
    renderRegisterPage,
    login,
    renderLoginPage,
    dashboard,
    addPost,
    createPost,
    editPost,
    edit,
    deletePost,
    logout,
    articles
}
