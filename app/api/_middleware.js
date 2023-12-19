import mongoose from "mongoose";
const connection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.on('connected', () => {
    console.log('MongoDB connected for API routes!');
  });
  
  connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  const connectMiddleware = (req, res, next) => {
    if (!connection.readyState) {
      connection.once('connected', next);
      connection.once('error', () => {
        console.error('MongoDB connection is not ready.');
        res.status(500).json({ error: 'Internal Server Error' });
      });
    } else {
      next();
    }
  };

export { connection, connectMiddleware };