const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

const reservationController = require('./controllers/reservation');
reservationController.scheduleReservationCancellations();

//Body parser
app.use(express.json());

app.use(cookieParser());

const auth = require('./routes/auth');
const workSpace = require('./routes/workSpace')
const reservations = require('./routes/reservation')

app.use(`/api/v1/auth`,auth);
app.use(`/api/v1/workspace`,workSpace);
app.use(`/api/v1/reservation`,reservations);

// app.get('/',(req,res)=>{
//     res.status(200).json({success:true,data:{id:1}});

// });

const PORT=process.env.PORT || 3000;
app.listen(PORT, console.log('server running in',process.env.NODE_ENV,'mode on port',PORT));