import puppeteer from 'puppeteer';
import path from 'path';

const sleep = (msec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, msec);
  });

export class MakeImage {
  constructor(public width = 600, public height = 600) {}
  async make(lon: number, lat: number, dark = false) {
    const page = await this.setUpPage(this.width, this.height);
    const html = generateHtml(
      lon,
      lat,
      16,
      dark
        ? `mapbox://styles/inaridiy/cktzbej1e0o3a17qoe8om3ttk`
        : `mapbox://styles/inaridiy/cktzca3fp0oxg17qofnmpia4f`
    );
    await page.setContent(html);

    await sleep(2000);
    const mapPath = path.resolve(`./images/map/${lon}_${lat}.png`);
    await page.screenshot({ path: mapPath });
    return mapPath;
  }

  async setUpPage(width: number, height: number) {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width,
        height,
      },
    });
    return await browser.newPage();
  }
}

const generateHtml = (
  lon: number,
  lat: number,
  zoom: number,
  theme = `mapbox://styles/inaridiy/cktzca3fp0oxg17qofnmpia4f`
) => {
  return `
  <!DOCTYPE html>
    <html lang='ja'>
      <head>
        <meta charset='utf-8' />
        <title>Points on a map</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css' rel='stylesheet' />
        <style>
          body { 
            margin: 0; 
            padding: 0; 
          }
          #map { 
            position: absolute; 
            top: 0; 
            bottom: 0; 
            width: 100%; 
          }
          .marker {
            background-image: url('https://img.icons8.com/ios-filled/40/0000FF/marker.png');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div id='map'></div>
        <script>
        // The value for 'accessToken' begins with 'pk...'
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW5hcmlkaXkiLCJhIjoiY2t0emF1ZXRuMDYwcDJucXJpamgycTE3bSJ9.CqEbQXJ_yiRdUa2qFYJRnw'; 
        const map = new mapboxgl.Map({
          container: 'map',
          style: '${theme}', 
          center: [${lat}, ${lon}],
          zoom: ${zoom}
        });
        const marker1 = new mapboxgl.Marker({color:"#ff4500",scale:2})
            .setLngLat([${lat}, ${lon}])
            .addTo(map);
    
        // Code from the next step will go here.
    
        </script>
      </body>
    </html>`;
};
