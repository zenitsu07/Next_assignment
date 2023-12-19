import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default mongoose.connection;