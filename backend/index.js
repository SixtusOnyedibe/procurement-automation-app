import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/route.js';

const app = express();
const port = 3001;

// Middlewares
// Allows us to send and receive json files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logs out route accessed with status
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// This enables all CORS - Cross Origin Resource Sharing & credentials
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// adding cookieParser to my app
app.use(cookieParser());

// Lets the server to listen to all files
app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
