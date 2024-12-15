import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
const router = express.Router();

let adminLoggedIn = false;
let adminLogoutTimer = null;

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {

    if (req.cookies.user) {
        if (req.cookies.user.Type === 'Admin')
            res.redirect('/insert');
        else if (req.cookies.user.Type === 'Customer')
            res.redirect('/search');
        else
            res.render('login');
    }
    else
        res.render('login');
});

router.get('/logout', (req, res) => {
    if (req.cookies.user?.type === 'Admin') {
        setAdminLoggedIn(false);
    }
    res.clearCookie('user');
    res.redirect('/');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUser();
    var userInfo = { Name: '', Type: '', id: 0, checkLogin: false, curPage: '' };

    users.map((user) => {
        if (vars.id === user.Email && parseInt(vars.password) === user.Password) {
            userInfo = { Name: user.Name, Type: user.Type, id: user.Email, checkLogin: true };
        }
    });

    if (userInfo.checkLogin) {
        if (userInfo.Type === 'Admin') {
            if (adminLoggedIn) {
                return res.send(`<script>
                                    alert('Another Admin is already modifying data. Please try again later.');
                                    location.href='/';
                                </script>`);
            } else {
                setAdminLoggedIn(true, 300000);
            }
        }

        res.cookie('user', {
            name: userInfo.Name, // 사용자 이름
            type: userInfo.Type, // 사용자 유형
            id: userInfo.id,     // 사용자 ID
            curPage: ''
        }, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true
        })

        selectSql.setIsolationLevel();
        selectSql.setLog();
        if (userInfo.Type === 'Admin')
            res.redirect('/insert');
        else if (userInfo.Type === 'Customer')
            res.redirect('/search');
    } else {
        console.log('login failed!');
        res.send(`<script>
                    alert('login failed!');
                    location.href='/';
                </script>`);
    }
});

module.exports = router;

function setAdminLoggedIn(value, timeout = null) {
    adminLoggedIn = value;

    if (adminLogoutTimer) {
        clearTimeout(adminLogoutTimer);
        adminLogoutTimer = null;
    }

    if (value && timeout) {
        adminLogoutTimer = setTimeout(() => {
            adminLoggedIn = false;
            adminLogoutTimer = null;
        }, timeout);
    }
};