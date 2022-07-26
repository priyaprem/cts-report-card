const express = require('express')
const connection = require('./connection')
const studentRoute = require('./routes/student')
const monthRoute = require('./routes/month')
const eventRoute = require('./routes/event')
const collegeRoute = require('./routes/college')
const collegeMonthEventRoute = require('./routes/college_month_event')
const eventDetail = require('./routes/event_detail')
const app = express();

const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/student', studentRoute)
app.use('/month', monthRoute)
app.use('/event', eventRoute)
app.use('/college', collegeRoute)
app.use('/data', collegeMonthEventRoute)
app.use('/event-detail', eventDetail)

module.exports = app