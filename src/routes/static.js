import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios({
            url: `https://www.gimkit.com${path}`,
            method: req.method.toLowerCase(),
            data: req.body,
            headers: {
                origin: 'https://www.gimkit.com',
                referer: 'https://www.gimkit.com/',
                host: 'www.gimkit.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
            },
            validateStatus: false
        });

        Object.entries(request.headers)
            .filter(([header]) => ['content-type', 'set-cookie'].some(allowedHeader => allowedHeader === header.toLowerCase()))
            .forEach(([header, value]) => res.header(header, value));

        res.status(request.status).send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};