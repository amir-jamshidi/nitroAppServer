const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//---------
const categoryRouter = require('./Routers/Category');
const authRouter = require('./Routers/Auth');
const questionsRouter = require('./Routers/Question');
//---------
const path = require('path');
//---------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/media", express.static(path.join(__dirname, 'Public', 'media')));
//---------
app.use('/category', categoryRouter)
app.use('/auth', authRouter)
app.use('/questions', questionsRouter)



module.exports = app;