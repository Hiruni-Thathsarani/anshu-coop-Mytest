import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { patientRouter } from './routes/patientRoutes';


const app = express();

app.use(cors());

app.use(bodyParser.json());


app.use('/patients', (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
}, patientRouter);

// If you want to enable the user routes later:
// app.use('/user', (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//     next();
// }, userRouter);
const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log('Server running on http://localhost', PORT);
});
