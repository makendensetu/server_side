import express from 'express';
import path from 'path';
import routeImage from './route/image';

const app = express();

app.use('/images', express.static(path.resolve('./images/output')));
app.use('/image', routeImage);

app.get('/', (req, res) => {
  res.send('Hello Typescript');
});

export default app;
