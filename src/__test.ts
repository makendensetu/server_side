import { MakeImage } from './makeImage/makeimage';
import { composite } from './makeImage/composite';

const mapMaker = new MakeImage(1000, 1000);

(async () => {
  const mapPath = await mapMaker.make(35.6595327, 139.7445911, false);
  const outputPath = await composite('test', 'c1921d03.jpg', mapPath);
  console.log(outputPath);
})();
