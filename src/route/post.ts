import express from 'express';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { makeImage } from '../makeImage/makeImage';
import { prisma } from '../prisma';

const router = express.Router();
const upload = multer({
  dest: path.resolve(`./images/upload`),
  limits: { fieldSize: 10_000_000 },
});

router.post('/', upload.single('image'), async (req, res) => {
  const { lat, lon } = req.body;
  if (!req.file || !lat || !lon) {
    res.status(400).send('Not enough data.');
  } else {
    try {
      const itemId = nanoid();
      const outputPath = await makeImage(itemId, req.file.path, lat, lon);
      if (!outputPath) throw Error('なんかエラー');
      await prisma.post.create({
        data: {
          id: itemId,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          imagePath: outputPath,
        },
      });
      res.json({ id: itemId });
    } catch (e) {
      console.error(e);
      res.status(500).send('server error');
    }
  }
});

router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!(id && typeof id === 'string')) {
    res.status(400).send('The id is not correct.');
  } else {
    try {
      const data = await prisma.post.findUnique({ where: { id } });
      if (data) {
        const { lon, lat } = data as any as {
          lon: number;
          lat: number;
        };
        res.json({ lon, lat, id });
      } else {
        res.status(404).send('Unregistered data');
      }
    } catch (e) {
      res.status(500).send('server error');
    }
  }
});

export default router;
