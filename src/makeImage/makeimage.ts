import { MakeMapImage } from './makeMapImage';
import { composite } from './composite';

const mapMaker = new MakeMapImage(600, 600);

export const makeImage = async (
  id: string,
  uploadedPath: string,
  lat: number,
  lon: number
) => {
  const mapPath = await mapMaker.make(lat, lon, false);
  const outputPath = await composite(id, uploadedPath, mapPath);
  return outputPath;
};
