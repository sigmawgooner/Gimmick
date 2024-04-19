import axios from 'axios';
import fs from 'fs';

export default async (req, res, path) => {
    try {
        if (path !== '/join') return res.redirect('/join');

        let request = await axios.get(`https://www.gimkit.com/join`);

        Object.entries(request.headers)
            .filter(([header]) => ['content-type', 'set-cookie'].some(allowedHeader => allowedHeader === header.toLowerCase()))
            .forEach(([header, value]) => res.header(header, value));

        request.data = request.data.replace(`<head>`, `<head>
            <script>${fs.readFileSync('./src/cheat/bundle.js', 'utf-8')}</script>`);

        res.send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};