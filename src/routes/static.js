import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios({
            url: `https://www.gimkit.com${path}`,
            method: req.method.toLowerCase(),
            data: Object.keys(req.body).length < 1 ? null : req.body,
            headers: {
                accept: '*/*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'connection': 'keep-alive',
                cookie: req.headers.cookie,
                host: 'www.gimkit.com',
                origin: 'https://www.gimkit.com',
                pragma: 'no-cache',
                referer: 'https://www.gimkit.com/',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="134", "Google Chrome";v="134"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
            },
            validateStatus: false,
            timeout: 5000
        });

        ['content-type', 'set-cookie'].forEach((header) => {
            if (request.headers[header])
                res.header(header, request.headers[header]);
        });

        res.status(request.status).send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};