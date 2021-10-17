require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const path = require('path')
const helmet = require("helmet")

<<<<<<< HEAD


mongoose.connect('mongodb+srv://agnes:123@cluster0.t5kfb.mongodb.net/piiquante?retryWrites=true&w=majority',
=======
mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.t5kfb.mongodb.net/piiquante?retryWrites=true&w=majority`,
>>>>>>> 13593e7225e3e985ab8c9f1814e670a3628aa68f
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


app.use(helmet());
// routes
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes )
app.use('/images', express.static(path.join(__dirname, 'images')));

// declaration port for server!'));
app.listen(3000, () => console.log('server is running'))
console.log(process.env.NODE_ENV)   
console.log(process.env.DB_USER_NAME)
console.log(process.env.DB_PASSWORD)