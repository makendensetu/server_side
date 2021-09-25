import express from 'express';
import path from 'path';

const app = express();

app.use('/images', express.static(path.resolve('./images/output')));
app.get('/', (req, res) => {
  res.send('Hello Typescript');
});

export default app;
