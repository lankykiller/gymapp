const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

if (!port) {
  throw new Error('PORT is not defined');
}

module.exports = {
  MONGODB_URI,
  port,
};