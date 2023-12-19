import mongoose from "mongoose";

const connectMiddleware = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 0) {
      const connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection.connection.on('connected', () => {
        console.log('MongoDB connected for API routes!');
      });
    }
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectMiddleware;
