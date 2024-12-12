import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {

    if (req.cookies.user)
        res.redirect('/insert');
    else
        res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUser();
    var userInfo = { Name: '', Type: '', id: 0, checkLogin: false, curPage: '' };

    users.map((user) => {
        if (vars.id === user.Email && parseInt(vars.password) === user.Password) {
            userInfo = { Name: user.Name, Type: user.Type, id: user.ID, checkLogin: true };
        }
    });

    if (userInfo.checkLogin) {
        res.cookie('user',{
            name: userInfo.Name, // 사용자 이름
            type: userInfo.Type, // 사용자 유형
            id: userInfo.id,     // 사용자 ID
            curPage: ''
        }, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })

        if (userInfo.Type === 'Admin')
            res.redirect('/insert');
        else if (userInfo.Type === 'Customer')
            res.redirect('/');
    } else {
        console.log('login failed!');
        res.send(`<script>
                    alert('login failed!');
                    location.href='/';
                </script>`)
        res.redirect('/');
    }
});

module.exports = router;
