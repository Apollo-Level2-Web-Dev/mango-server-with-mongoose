import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`
🥭 =============================================== 🥭
      
    🚀 Mango Management Server is Running!
    
    🌐 Port: ${config.port}
    🔗 Local: http://localhost:${config.port}
    📝 API Docs: http://localhost:${config.port}/
    ⚡ Environment: ${config.node_env || 'development'}
    🕒 Started at: ${new Date().toLocaleString()}

🥭 =============================================== 🥭
      `);
    });
  } catch (error: any) {
    console.log(`
❌ =============================================== ❌

    🔥 Server Error: Failed to Start!
    
    💀 Error Details:
    📌 Message: ${error.message}
    🔍 Stack: ${error.stack}
    ⚡ Environment: ${config.node_env || 'development'}
    🕒 Time: ${new Date().toLocaleString()}

❌ =============================================== ❌
      `);
  }
}

server();
