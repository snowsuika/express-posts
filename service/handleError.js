const handleError = (req, res, errorMessage) => {
    console.log('errmessage', errorMessage);
    res.status(400);
    res.send({
        status: 'error',
        message: errorMessage.message,
    });
    res.end();
};

module.exports = handleError;
