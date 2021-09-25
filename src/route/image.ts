import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({
  dest: path.resolve(`./images/upload`),
  limits: { fieldSize: 10000000 },
});

router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

export default router;
