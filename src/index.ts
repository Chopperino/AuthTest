import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { auth } from "./routes/auth.router";
import { main } from "./routes/main.router";
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', main)
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;