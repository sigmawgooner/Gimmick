import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios.get(`https://gimkit.com${path}`, {
            responseType: 'stream'
        });

        Object.entries(request.headers)
            .filter(([header]) => ['content-type', 'set-cookie'].some(allowedHeader => allowedHeader === header.toLowerCase()))
            .forEach(([header, value]) => res.header(header, value));

        request.data.pipe(res);
    } catch (e) {
        console.error(e, path);
    };
};