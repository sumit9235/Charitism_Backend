const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 8, // limit each IP to 8 requests per windowMs
    message: 'Too many requests from this IP, please try again after 1 minutes.',
  });

  module.exports={
    limiter
  }