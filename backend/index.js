import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

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
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// adding cookieParser to my app
app.use(cookieParser());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});