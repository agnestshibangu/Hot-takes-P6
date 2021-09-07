// // require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://agnes:Kekebambi_12@cluster0.t5kfb.mongodb.net/piiquante?retryWrites=true&w=majority',
{ useNewUrlParser: true, })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée'))
 




// correct Cross Origin erros
const cors = require('cors')
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", 'PUT', "DELETE", "PATCH", "OPTIONS"],
  })
)


// // connexion to DB 
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
// .then(() => console.log('Connexion à MongoDB réussie !'))
// .catch(() => console.log('Connexion à MongoDB échouée !'));





// built-in middleware function in Express. it parses incoming requests with JSON payloads and is based on body-parser
// payload = les données qu'on veut encoder
app.use(express.json())

 
// routes
const userRoutes = require('./routes/user')
app.use('/api/auth', userRoutes)


// declaration port for server!'));
app.listen(3000, () => console.log('server is running'))