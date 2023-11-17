const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//-------
dotenv.config();
const PORT = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGODB);
    console.log('MongoDB Connected');
})()

app.listen(PORT, () => {
    console.log(`Srever Running On Port ${PORT}`);
})