import express from 'express';
import path from 'path';
import cors from 'cors';
import routeImage from './route/post';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.resolve('./images/output')));
app.use('/post', routeImage);

app.get('/', (req, res) => {
  res.send('Welcome はい地-図 API');
});
app.get('/teapot', (req, res) => {
  res.status(418).send("I'm a teapot");
});

export default app;
