var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // 解決跨域問題

// router
var postRouter = require('./routes/posts');

// middlewares
var errorHandler = require('./middlewares/errorHandler.js');

require('./connections');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRouter);

// 404 Not Found
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'error',
        message: '404 Not Found',
    });
    res.end();
    next();
});

//handle Error
app.use(errorHandler);

module.exports = app;
