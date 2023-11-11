const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./controllers/users');
const mailRoutes = require('./controllers/mail');
const port = process.env.PORT || 5000;
const cors = require('cors');

//getting json data
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//controllers
app.use('/users', userRoutes);
app.use('/mail', mailRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_ATLAS_URL)
  .then(() => console.log('DB Connected'));

//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => console.log('Server Started on Port=', port));
