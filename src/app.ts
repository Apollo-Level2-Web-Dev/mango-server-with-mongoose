import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './modules/routes';

const app: Application = express();

app.use(express.json());
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    errorDetails: err,
  });
});

export default app;
