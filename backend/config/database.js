import mongoose from 'mongoose';
import { MONGO_URI } from '../config/index.js'




export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        console.error('Server will continue but API may not work. Check MONGO_URI in .env');
    }
};

// 
