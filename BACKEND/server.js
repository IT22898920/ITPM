const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const cors = require('cors');
const axios = require("axios");

require("dotenv").config();


const app = express();

//import routes
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/auth')
const synonymsRouter = require('./routes/synonyms.js'); 
const antonymsRouter = require('./routes/antonyms.js'); 


//app middleware
app.use(bodyParser.json());
app.use(cors());

//app middleware
app.use(postRoutes);
app.use('/api/auth', userRoutes);            
app.use('/synonyms', synonymsRouter);
app.use('/antonyms', antonymsRouter);

const PORT = 8070;
const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});

 
