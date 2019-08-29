const express   =   require('express')
const app       =   express()
const mongoose  =   require('mongoose')
const dotenv    =   require('dotenv')

//to hide my mongoClusterURI using dotenv 
dotenv.config();
app.use(express.json()); //bodyParer middleware for JSONParsing

//connect to mongo cluster
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true }, () => console.log('connected to your database'))
//import routes
const authRoute =   require('./routes/auth')
const postRoute =   require('./routes/profile')
//route middleware
app.use('/api/user',authRoute) //api/user is always attached before the route
app.use('/api/post',postRoute) 


app.listen(3000, () => console.log('listening on port 3000'))