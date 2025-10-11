exports.errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message);
  
    res.status(500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  };