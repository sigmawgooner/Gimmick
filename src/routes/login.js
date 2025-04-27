import axios from 'axios';
import fs from 'fs';
import npath from 'path';

export default async (req, res, path) => {
    try {
        if (path.endsWith('/post')) {
            const checkEmail = await axios.post('https://www.gimkit.com/api/users/register/email-info', {
                email: req.body.email
            });

            if (!checkEmail.data.accountExists) return res.send({ error: 'email does not exist' });
            if (checkEmail.data.noPassword) return res.send({ error: 'you cannot sign in with a google-based email - add a password from the gimkit settings (gimkit.com/settings)' });

            const actuallyLogin = await axios.post('https://www.gimkit.com/api/login', {
                email: req.body.email,
                password: req.body.password,
                googleToken: ''
            });

            if (actuallyLogin.data.message) return res.send({ error: actuallyLogin.data.message.text });
            if (!actuallyLogin.data.user?._id) {
                console.log('couldn\'t login', actuallyLogin.data);
                return res.send({ error: 'unknown error' });
            }

            res.header('set-cookie', actuallyLogin.headers['set-cookie']);

            return res.send({ success: true });
        }

        const loginPage = fs.readFileSync(npath.join(import.meta.dirname, 'login.html'), 'utf8');
        res.send(loginPage);
    } catch (e) {
        console.error(e, path);
    };
};