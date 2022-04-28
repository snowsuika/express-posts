const HTTP_STATUS = require('../constants/HTTP_STATUS');

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: 'error',
        message: HTTP_STATUS[err.status] || '請求發生錯誤',
    });
    res.end();
};

module.exports = errorHandler;
