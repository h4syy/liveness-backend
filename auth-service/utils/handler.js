const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("Error:", error.message);
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
    next(error);
  });
};

export default asyncHandler;
