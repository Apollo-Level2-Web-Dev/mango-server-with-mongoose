import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function server() {
  try {
    await mongoose.connect(config.database_url!);

    app.listen(config.port, () => {
      console.log(`Server Running on port ${5000} `);
    });
  } catch (error) {
    console.error(`Server error ${server}`);
  }
}

server();
