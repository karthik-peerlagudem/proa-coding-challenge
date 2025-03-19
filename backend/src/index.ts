import dotenv from 'dotenv';
import app from './server';

dotenv.config();

if (!process.env.PORT) {
    throw new Error('PORT is not defined in .env file');
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
