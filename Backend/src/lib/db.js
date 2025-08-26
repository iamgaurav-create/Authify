import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
       const conne = await mongoose.connect(process.env.MONGO_URL)
       console.log(`MongoDB Connected: ${conne.connection.host}`);
       
    } catch (error) {
        console.log(`Error: ${error.message}`);    
    }
}