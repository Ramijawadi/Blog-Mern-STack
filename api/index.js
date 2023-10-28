const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./Models/User')
const Post = require('./Models/Post')
//crypte password

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

//parse cookies

var cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname + '/uploads'));


app.use(cors({credentials:true , origin:"http://localhost:3000"

}));
app.use(express.json());
const jwt = require('jsonwebtoken');
const secret = 'hgsdsqd45kskdksjd8sdd';

//multer for images
const multer  = require('multer')
const uploadMiddleWare = multer({ dest: 'uploads/' })
const fs = require('fs');

mongoose.connect('mongodb+srv://rami:rami@cluster0.j2me5ib.mongodb.net')

app.post('/register', async (req, res) => {
const {username , password} = req.body;

try {
    const user = await User.create({
        username , 
        password:bcrypt.hashSync(password, salt)
    });
        res.json(user)
} catch (e) {
    res.status(400).json(e);
}
});


app.post('/login' ,async (req,res)=> {

const { username , password } = req.body;

const userDoc = await User.findOne({username});

const passOk = bcrypt.compareSync(password , userDoc.password);


if(passOk){

    //loggedin

  jwt.sign({username ,id:userDoc._id} , secret , {} , (err , token)=> {
if(err)
throw err ; 

//stored token as cookie
res.cookie('token',token).json({

id:userDoc._id, 
username,

})
  }) ;
    //create a token
}
else {
    
res.status(400).json('wrong credentials')
}

});

app.get('/profile' , (req, res)=> {

    const {token} = req.cookies;
    jwt.verify(token , secret , {} ,(err , info) => {

        if(err) throw err ; 
        res.json(info);
    })
})

app.post('/logout' , (req , res) => {

res.cookie('token' , '').json('ok');

});

/*get oparation with file*/ 

app.post('/post' , uploadMiddleWare.single('file'), async (req, res) => {

const {originalname , path} = req.file ; 

const parts = originalname.split('.');
const extension = parts[parts.length -1];
const newPath =path+'.'+extension;

fs.renameSync(path, newPath);


const {token} = req.cookies;
jwt.verify(token , secret , {} ,async (err , info) => {

    if(err) throw err ; 

    const { title , summary , content} = req.body ; 
    const postDoc = await Post.create({
    title , 
    summary , 
    content ,
    cover: newPath , 
    author:info.id
    });

    res.json(postDoc);
  
});
});


/*update operation*/ 


app.put('/post' , uploadMiddleWare.single('file'), async(req , res) => {

let newPath = null ;


if(req.file) {

    const {originalname , path} = req.file ; 

    const parts = originalname.split('.');
    const extension = parts[parts.length -1];
     newPath =path+'.'+extension;
    
    fs.renameSync(path, newPath);

}
const {token} = req.cookies;
jwt.verify(token , secret , {} ,async (err , info) => {

    if(err) throw err ; 
    const {id ,  title , summary , content} = req.body ; 
const postDoc = await Post.findById(id)

const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) ; 


if(!isAuthor) {

    res.status(400).json('you are not the author')

}
await postDoc.updateOne({title,
     summary,
     content,
     cover:newPath?newPath : postDoc.cover,})

res.json(postDoc)
});
})

/*delete operation*/ 


app.delete('/post/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Post.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send({ message: "blog not found" });
      }
      return res.status(200).send({ message: " Blog  deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
  


app.get('/post' ,async (req, res) => {
const posts = await Post.find().populate('author' , ['username'])
.sort({createdAt: -1})
.limit(20);
res.json(posts);
})


app.get('/post/:id' ,async (req,res) => {

    const {id} = req.params;

   const postDoc = await Post.findById(id).populate('author' ,['username'] );
   res.json(postDoc);
})



app.listen(4000)





