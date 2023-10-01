/*
File Name: app.js
Student: Amber Malik
Student ID: 301344310
Date: September 18, 2023
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Define your routes here
const indexRouter = require('../../routes/index');
const usersRouter = require('../../routes/users');
const projectsRouter = require('../../routes/projects'); 
const contactRouter = require('../../routes/contact'); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter); 
app.use('/contact', contactRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handling middleware
app.use(function(err, req, res, next) {
  // Handle the error here, e.g., log it to the console
  console.error(err);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
