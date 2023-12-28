const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    return req.headers.cookie.split('; ').reduce((parsedCookies, rawCookie) => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
        return parsedCookies;
    }, {});
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });
}

app.use(express.static(path.join(__dirname, 'static')));

// Serve Vue.js app
app.use('/', express.static(path.join(__dirname, 'dist')));

// Serve admin interface
app.use('/administrator', express.static(path.join(__dirname, 'static')));

app.get('/administrator/register', (req, res) => {
    res.sendFile('register.html', { root: './static/administrator' });
});

app.get('/administrator/login', (req, res) => {
    res.sendFile('login.html', { root: './static/administrator' });
});

app.get('/administrator', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/administrator' });
});

app.listen(9000, () => {
    console.log('Server started on localhost:9000');
});
