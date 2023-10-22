const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./Models/User')

//crypte password

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());


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

app.listen(4000)





