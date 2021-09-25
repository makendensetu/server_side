import sharp from 'sharp';
import path from 'path';

export const composite = async (
  id: string,
  imagePath: string,
  mapPath: string
) => {
  try {
    const outputPath = path.resolve(`./images/output/${id}.png`);
    const { height, width } = await sharp(imagePath).metadata();
    if (!height || !width) throw Error('image not found');
    const mapHeight = height > width * 1.5 ? (width / 3) * 2 : height / 2;
    const resizedMapPath = path.resolve(
      `./images/mapResized/resized_${path.basename(mapPath)}`
    );
    await sharp(mapPath).resize(null, mapHeight).toFile(resizedMapPath);
    await sharp(imagePath)
      .composite([
        {
          input: resizedMapPath,
          gravity: 'southeast',
        },
      ])
      .toFile(outputPath);
    return outputPath;
  } catch (e) {
    console.error(e);
  }
};
