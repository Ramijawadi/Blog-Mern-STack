// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose')
// const User = require('./Models/User')
// const Post = require('./Models/Post')
// //crypte password

// const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);

// //parse cookies

// var cookieParser = require('cookie-parser')
// app.use(cookieParser());
// app.use('/uploads' , express.static(__dirname + '/uploads'));

// app.use(cors({credentials:true , origin:"http://localhost:3000"

// }));
// app.use(express.json());
// const jwt = require('jsonwebtoken');
// const secret = 'hgsdsqd45kskdksjd8sdd';

// //multer for images
// const multer  = require('multer')
// const uploadMiddleWare = multer({ dest: 'uploads/' })
// const fs = require('fs');

// mongoose.connect('mongodb+srv://rami:rami@cluster0.j2me5ib.mongodb.net')

// app.post('/register', async (req, res) => {
// const {username , password} = req.body;

// try {
//     const user = await User.create({
//         username ,
//         password:bcrypt.hashSync(password, salt)
//     });
//         res.json(user)
// } catch (e) {
//     res.status(400).json(e);
// }
// });

// app.post('/login' ,async (req,res)=> {

// const { username , password } = req.body;

// const userDoc = await User.findOne({username});

// const passOk = bcrypt.compareSync(password , userDoc.password);

// if(passOk){

//     //loggedin

//   jwt.sign({username ,id:userDoc._id} , secret , {} , (err , token)=> {
// if(err)
// throw err ;

// //stored token as cookie
// res.cookie('token',token).json({

// id:userDoc._id,
// username,

// })
//   }) ;
//     //create a token
// }
// else {

// res.status(400).json('wrong credentials')
// }

// });

// app.get('/profile' , (req, res)=> {

//     const {token} = req.cookies;
//     jwt.verify(token , secret , {} ,(err , info) => {

//         if(err) throw err ;
//         res.json(info);
//     })
// })

// app.post('/logout' , (req , res) => {

// res.cookie('token' , '').json('ok');

// });

// /*get oparation with file*/

// app.post('/post' , uploadMiddleWare.single('file'), async (req, res) => {

// const {originalname , path} = req.file ;

// const parts = originalname.split('.');
// const extension = parts[parts.length -1];
// const newPath =path+'.'+extension;

// fs.renameSync(path, newPath);

// const {token} = req.cookies;
// jwt.verify(token , secret , {} ,async (err , info) => {

//     if(err) throw err ;

//     const { title , summary , content} = req.body ;
//     const postDoc = await Post.create({
//     title ,
//     summary ,
//     content ,
//     cover: newPath ,
//     author:info.id
//     });

//     res.json(postDoc);

// });
// });

// /*update operation*/

// app.put('/post' , uploadMiddleWare.single('file'), async(req , res) => {

// let newPath = null ;

// if(req.file) {

//     const {originalname , path} = req.file ;

//     const parts = originalname.split('.');
//     const extension = parts[parts.length -1];
//      newPath =path+'.'+extension;

//     fs.renameSync(path, newPath);

// }
// const {token} = req.cookies;
// jwt.verify(token , secret , {} ,async (err , info) => {

//     if(err) throw err ;
//     const {id ,  title , summary , content} = req.body ;
// const postDoc = await Post.findById(id)

// const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) ;

// if(!isAuthor) {

//     res.status(400).json('you are not the author')

// }
// await postDoc.updateOne({title,
//      summary,
//      content,
//      cover:newPath?newPath : postDoc.cover,})

// res.json(postDoc)
// });
// })

// /*delete operation*/

// app.delete('/post/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const result = await Post.findByIdAndDelete(id);
//       if (!result) {
//         return res.status(404).send({ message: "blog not found" });
//       }
//       return res.status(200).send({ message: " Blog  deleted successfully" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: error.message });
//     }
//   });

// app.get('/post' ,async (req, res) => {
// const posts = await Post.find().populate('author' , ['username'])
// .sort({createdAt: -1})
// .limit(20);
// res.json(posts);
// })

// app.get('/post/:id' ,async (req,res) => {

//     const {id} = req.params;

//    const postDoc = await Post.findById(id).populate('author' ,['username'] );
//    res.json(postDoc);
// })

// app.listen(4000)

const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./Models/User.model");
 const Post = require('./Models/Post')

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = "agk5r7e8fvv69zmpoq2";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Database connection with proper logging and error handling
const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(
      "mongodb+srv://ramijawadi104:QRwytgtbmG5oyCRd@cluster2025.jimlkao.mongodb.net/"
    );
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database Host: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Connect to database
connectDB();



app.post("/register", async (req, res) => {
  try {
    console.log('📝 Registration attempt for user:', req.body.username);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).json("Username and password are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('❌ User already exists:', username);
      return res.status(400).json("Username already taken");
    }

    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    
    console.log('✅ User registered successfully:', username, 'with ID:', userDoc._id);
    res.json(userDoc);
  } catch (e) {
    console.error('❌ Registration error:', e.message);
    res.status(400).json("Registration failed: " + e.message);
  }
});


app.post("/login", async (req, res) => {
  try {
    console.log('🔐 Login attempt for user:', req.body.username);
    const { username, password } = req.body;
    
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      console.log('❌ User not found:', username);
      return res.status(400).json("User not found!");
    }
    
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      console.log('✅ Login successful for user:', username);
      //logged in
      //jwt
     jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          console.error('❌ JWT signing error:', err);
          return res.status(500).json("Token generation failed");
        }
        console.log('🎫 Token generated successfully for user:', username);
        res.cookie("token", token).json({
           id:userDoc._id,
           username,
        });
      });
    } else {
      console.log('❌ Invalid password for user:', username);
      res.status(400).json("wrong credential !");
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json("Internal server error during login");
  }
});

/* on a ajoute cet endpoint pour utuliser le cookies*/
app.get("/profile", (req, res) => {
  try {
    console.log('👤 Profile request received');
    const {token}=req.cookies;
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json("No token provided");
    }
    
    jwt.verify(token , secret , {} , (err , info)=> {
      if(err) {
        console.error('❌ Token verification failed:', err.message);
        return res.status(401).json("Invalid token");
      }
      console.log('✅ Profile accessed by user:', info.username);
      res.json(info);
    });
  } catch (error) {
    console.error('❌ Profile endpoint error:', error.message);
    res.status(500).json("Internal server error");
  }
});

app.post('/logout', (req, res) => {
  try {
    console.log('🚪 Logout request received');
    
    // Clear the token cookie with proper configuration
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    // Alternative method to ensure cookie is cleared
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    console.log('✅ User logged out successfully - token cleared');
    res.json({ message: 'Logged out successfully' });
    
  } catch (error) {
    console.error('❌ Logout error:', error.message);
    res.status(500).json({ error: 'Logout failed' });
  }
})

app.post('/post' ,uploadMiddleWare.single('file') ,async(req,res) => {
  try {
    console.log('📝 New post creation attempt');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json("File upload required");
    }
    
    const {originalname , path }= req.file ;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath =  path+' . '+ext ;
    
    fs.renameSync(path,newPath);
    console.log('📁 File uploaded and renamed:', newPath);

    const {title , content , summary} = req.body;

    if (!title || !content || !summary) {
      console.log('❌ Missing required fields');
      return res.status(400).json("Title, content, and summary are required");
    }

    const postDoc = await Post.create({
      title,
      content,
      summary,
      cover:newPath
    });

    console.log('✅ Post created successfully with ID:', postDoc._id);
    res.json(postDoc);
    
  } catch (error) {
    console.error('❌ Post creation error:', error.message);
    res.status(500).json("Failed to create post: " + error.message);
  }
})
// Server configuration and startup
const PORT = process.env.PORT || 4000;

const startServer = () => {
  try {
    const server = app.listen(PORT, () => {
      console.log('🚀 Server Started Successfully!');
      console.log('='.repeat(50));
      console.log(`🌐 Server running on port: ${PORT}`);
      console.log(`🔗 Server URL: http://localhost:${PORT}`);
      console.log(`🕒 Started at: ${new Date().toLocaleString()}`);
      console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('='.repeat(50));
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        console.log(`💡 Try a different port or kill the process using port ${PORT}`);
      } else {
        console.error('❌ Server error:', error.message);
      }
      process.exit(1);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('🔄 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close(false, () => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('🔄 SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close(false, () => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

/*password    WVpZfCNx9rohaagC*/

/*  mongodb+srv://blog:WVpZfCNx9rohaagC@cluster0.5kdnhwe.mongodb.net/*/
/*mongodb+srv://blog:WVpZfCNx9rohaagC@cluster0.5kdnhwe.mongodb.net/?retryWrites=true&w=majority*/


/*new pwd     QRwytgtbmG5oyCRd   */ 
/*username  ramijawadi104*/ 

/*mongodbVSCode      mongodb+srv://ramijawadi104:QRwytgtbmG5oyCRd@cluster2025.jimlkao.mongodb.net/  */ 