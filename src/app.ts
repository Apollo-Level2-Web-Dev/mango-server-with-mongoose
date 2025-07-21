import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';
import { notFoundRoute } from './middleware/notFoundRoute';
import { globalErrorHandler } from './middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mango Management API 🥭</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #ff6b6b;
                text-align: center;
                margin-bottom: 30px;
            }
            .status {
                background: #c3e88d;
                color: #2d3436;
                padding: 10px 20px;
                border-radius: 50px;
                display: inline-block;
                margin-bottom: 20px;
            }
            .routes {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .route {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                border-bottom: 1px solid #dee2e6;
            }
            .route:last-child {
                border-bottom: none;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #6c757d;
            }
            .badge {
                background: #4834d4;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🥭 Mango Management API</h1>
            
            <div style="text-align: center;">
                <div class="status">🚀 Server is running smoothly</div>
            </div>

            <div class="routes">
                <h2>📚 Available Routes</h2>
                <div class="route">
                    <span>Mangos API</span>
                    <span class="badge">/api/mango</span>
                </div>
                <div class="route">
                    <span>Users API</span>
                    <span class="badge">/api/user</span>
                </div>
                <div class="route">
                    <span>Orders API</span>
                    <span class="badge">/api/order</span>
                </div>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #856404; margin: 0;">📖 Documentation</h3>
                <p style="margin: 10px 0 0 0;">Coming soon...</p>
            </div>

            <div class="footer">
                <p>Version 1.0.0</p>
                <p>Maintained by Apollo Level 2 Web Dev Team</p>
                <p>Last Updated: ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
