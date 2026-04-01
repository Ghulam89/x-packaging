import mongoose from 'mongoose';
import { MONGO_URI } from './index'
export const connectDB = async () => {
    if (!MONGO_URI) {
        console.error('MONGO_URI is missing. Check backend .env configuration.');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected');
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown database error';
        console.error('Database connection failed:', message);
        console.error('Server will continue but API may not work. Check MONGO_URI in .env');
    }
};