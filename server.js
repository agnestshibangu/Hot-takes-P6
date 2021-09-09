// // require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const path = require('path')

mongoose.connect('mongodb+srv://agnes:helloword@cluster0.t5kfb.mongodb.net/piiquante?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée'))
 


//correct Cross Origin erros
const cors = require('cors')
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", 'PUT', "DELETE", "PATCH", "OPTIONS"],
  })
)

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// built-in middleware function in Express. it parses incoming requests with JSON payloads and is based on body-parser
// payload = les données qu'on veut encoder
app.use(express.json())

// multer middleware
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images' )
//   }, 
//   filename : (req, file, cb) => {
//     cb(null, Date.now() + '--' + file.originalname)
//   }
// })
// const upload = multer({storage, fileStorageEngine })

// app.post('/single', upload.single('image'), (req, res) => {
//   console.log(req.file)
//   res.send('single file upload success')
// })



// routes
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes )
app.use('/images', express.static(path.join(__dirname, 'images')));

// declaration port for server!'));
app.listen(3000, () => console.log('server is running'))