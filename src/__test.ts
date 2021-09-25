import { MakeMapImage } from './makeImage/makeMapImage';
import { composite } from './makeImage/composite';

const mapMaker = new MakeMapImage(1000, 1000);

(async () => {
  const mapPath = await mapMaker.make(35.6595327, 139.7445911, false);
  const outputPath = await composite(
    'test',
    '242ea6d2a7475e5134f23b5c1acfe7b3',
    mapPath
  );
  console.log(outputPath);
})();
