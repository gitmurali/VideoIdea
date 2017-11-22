if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: 'mongodb://murali:murali@ds117316.mlab.com:17316/videoidea-prod' };
} else {
  module.exports = { mongoURI: 'mongodb://localhost/video-dev' };
}
