const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//---------
const path = require('path');
//---------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/media", express.static(path.join(__dirname, 'Public', 'media')));





module.exports = app;