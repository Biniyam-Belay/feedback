const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
        error: err.message || 'Server Error',
    });
};

export { errorHandler };
