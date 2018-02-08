const config = {
  CACHE_TTL: parseInt(process.env.APP_CACHE_TTL, 10) || 300000, // In milliseconds
};

module.exports = config;
