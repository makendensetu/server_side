import express from 'express';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { makeImage } from '../makeImage/makeImage';

const router = express.Router();
const upload = multer({
  dest: path.resolve(`./images/upload`),
  limits: { fieldSize: 10_000_000 },
});

router.post('/', upload.single('image'), async (req, res) => {
  const { lat, lon } = req.body;
  if (!req.file) {
    res.status(400).send('Not enough data.');
  } else {
    try {
      const outputPath = await makeImage(nanoid(), req.file.path, lat, lon);
      console.log(outputPath);
      res.send('ok');
    } catch (e) {
      res.status(500).send('someError');
    }
  }
});

export default router;
