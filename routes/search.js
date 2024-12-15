import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
import { insertSql } from "../database/sql";
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        res.redirect('/search/book');
    }
    else
        res.redirect('/');
});

router.get('/book', async (req, res) => {
    if (req.cookies.user) {
        const page = '/book';
        getPage(req, res, page);
    }
    else
        res.redirect('/');
});

router.get('/author', async (req, res) => {
    if (req.cookies.user) {
        const page = '/author';
        getPage(req, res, page);
    }
    else
        res.redirect('/');
});

router.get('/award', async (req, res) => {
    if (req.cookies.user) {
        const page = '/award';
        getPage(req, res, page);
    }
    else
        res.redirect('/');
});

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        const rawDatas = await selectSql.getBookToBook(req.body.name);
        const datas = getCanBuy(rawDatas);
        const page = '/book';
        getPageWithData(req, res, datas, page);
    }
    else
        res.redirect('/');
});

router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        const rawDatas = await selectSql.getBookToAuthor(req.body.name);
        const datas = getCanBuy(rawDatas);
        const page = '/author';
        getPageWithData(req, res, datas, page);
    }
    else
        res.redirect('/');
});

router.post('/award', async (req, res) => {
    if (req.cookies.user) {
        const rawDatas = await selectSql.getBookToAward(req.body.name);
        const datas = getCanBuy(rawDatas);
        const page = '/award';
        getPageWithData(req, res, datas, page);
    }
    else
        res.redirect('/');
});

router.post('/basket', async (req, res) => {
    if (req.cookies.user) {
        const data = { Book_ISBN: req.body.ISBN, Number: req.body.quantity, User_Email: req.cookies.user.id };
        const result = await insertSql.insertBasket(data);
        exceptionResult(res, result, '/book');
    }
    else
        res.redirect('/');
});

router.post('/reservation', async (req, res) => {
    if (req.cookies.user) {
        const Date = req.body.pickupDateTime.split('T')[0];
        const Time = req.body.pickupDateTime.split('T')[1];

        const data = { Book_ISBN: req.body.ISBN, User_Email: req.cookies.user.id, Date: Date, Time: Time };
        const result = await insertSql.insertReservation(data);
        exceptionResult(res, result, '/book');
    }
    else
        res.redirect('/');
});

module.exports = router;

function getRoutes() {
    const routes = [
        { path: '/search', label: '+ Search Book' },
        { path: '/select/basket', label: '+ Shopping basket' },
        { path: '/select/reservation', label: '+ Reservation' },
    ];

    return routes;
}

function getCanBuy(rawDatas) {
    for (let i = 0; i < rawDatas.length; i++) {
        rawDatas[i].canBuy = rawDatas[i].Number <= 0
    }
    return rawDatas;
}

function getPage(req, res, page) {
    const post = '/search' + page;
    const routes = getRoutes();
    const userName = req.cookies.user.name;
    const isLoggedIn = true;

    res.render('search', { routes, userName, isLoggedIn, post });
}

function getPageWithData(req, res, datas, page) {
    const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author', 'Number'];
    const post = '/search' + page;
    const routes = getRoutes();
    const userName = req.cookies.user.name;
    const isLoggedIn = true;

    res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
}


function exceptionResult(res, result, page) {
    if (result === 'success')
        res.redirect('/search' + page);
    else
        return res.send(`<script> 
                alert("failed! Error: ${result}");
                window.location.href = '/search${page}';
                 </script>`);
}