import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios.get(`https://gimkit.com${path}`, {
            responseType: 'arraybuffer'
        });

        Object.entries(request.headers)
            .filter(([header]) => ['content-type', 'set-cookie'].some(allowedHeader => allowedHeader === header.toLowerCase()))
            .forEach(([header, value]) => res.header(header, value));

        res.send(Buffer.from(request.data, 'binary'));
    } catch (e) {
        console.error(e, path);
    };
};