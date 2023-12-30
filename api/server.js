const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8000;

const quoteRouter = require('./routes/quotes');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => {
    console.log("Database connection established")
})


app.use(express.json())
app.use('/api/v1/quotes', quoteRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});