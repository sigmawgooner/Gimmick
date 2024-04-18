import axios from 'axios';
import express from 'express';
import fs from 'fs';

import paths from './paths.js';

(async () => {
    let script = await axios.get(`https://raw.githubusercontent.com/TheLazySquid/GimkitCheat/main/build/bundle.js`);
    if (!fs.existsSync('./src/cheat')) fs.mkdirSync('./src/cheat');
    fs.writeFileSync(`./src/cheat/bundle.js`, script.data);
    
    const app = express();

    app.use(express.json());

    app.all(`/*`, async (req, res) => {
        let path = req.url.split('?')[0];

        let file = paths.find((pathData) => typeof pathData.match === 'string' ? path === pathData.match : pathData.match.test(path));
        if (!file) return console.log(`Unknown file for path "${path}"`);

        console.log(`Detected ${path} as ${file.handler}!`);

        await (await import(`./routes/${file.handler}.js`)).default(req, res, path);
    });

    app.listen(6060, () => console.log(`gimmick @ http://localhost:6060`));
})();