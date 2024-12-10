const express = require('express');
const router = express.Router();
const Post = require('../models/post');


// Routes and pagination
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "simplyWrite",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
 
    let perPage = 3;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // query the num of post we have
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


// without pagination
// router.get('', async (req, res) => {
//     const locals = {
//         title: "Mercy Vincent Blog",
//         description: "Simple Blog created with Nodejs, Express and Mongodb."
//     }
//     try{
//      const data = await Post.find();
//     res.render('index', {locals, data});
//     }catch(err){
//     console.log(err)
//     }
// })


/**
 * POST /
 * Post - searchTerm
*/

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Get - blog
*/
// get blog post when u click on them
router.get('/post/:id', async (req, res) => {
    try{
       
        // grab id
        let slug = req.params.id;


        const data = await Post.findById({ _id: slug});
        
        const locals = {
          title: data.title,
          description: "Simple Blog created with Nodejs, Express and Mongodb.",

      }

        res.render('post', {
          locals,
          data,
          currentRoute: `/post/${slug}`

        });
        }catch(err){
        console.log(err)
        }
    });



router.get('/about', (req, res) => {
    res.render('about', {
      currentRoute: '/about'
    }
    );
})



// function insertPostData () {
//     Post.insertMany([
  
//         {
//           title: 'Node Content v1 is awesome!',
//           body: 'This is my first article!',
//           tags: ['Node', 'Content', 'Learning', 'first'],
//           image: 'https://via.placeholder.com/150'
//         },
//         {
//           title: 'This is my second article!',
//           body: 'Guess what? Node content is awesome!',
//           tags: ['Node', 'Content', 'Learning', 'second'],
//           image: 'https://via.placeholder.com/150'
//         },
//         {
//           title: 'This is my third article!',
//           body: 'You finally got the point about Node content',
//           tags: ['Node', 'Content', 'Learning', 'third'],
//           image: 'https://via.placeholder.com/150'
//         }
      
//   //     {
//   //       title: "Understand how to work with MongoDB and Mongoose",
//   //       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//   //     },
//   //     {
//   //       title: "build real-time, event-driven applications in Node.js",
//   //       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//   //     },
//   //     {
//   //       title: "Discover how to use Express.js",
//   //       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//   //     },
//   //     {
//   //       title: "Asynchronous Programming with Node.js",
//   //       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//   //     },
//   //     {
//   //       title: "Learn the basics of Node.js and its architecture",
//   //       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//   //     },
//   //     {
//   //       title: "NodeJs Limiting Network Traffic",
//   //       body: "Learn how to limit netowrk traffic."
//   //     },
//   //     {
//   //       title: "Learn Morgan - HTTP Request logger for NodeJs",
//   //       body: "Learn Morgan."
//   //     },
//     ]) 
//   }
  
//   insertPostData();

module.exports = router;