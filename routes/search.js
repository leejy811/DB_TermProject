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
        const post = '/search/book';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, post });
    }
    else
        res.redirect('/');
});

router.get('/author', async (req, res) => {
    if (req.cookies.user) {
        const post = '/search/author';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, post });
    }
    else
        res.redirect('/');
});

router.get('/award', async (req, res) => {
    if (req.cookies.user) {
        const post = '/search/award';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, post });
    }
    else
        res.redirect('/');
});

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        const name = req.body.name;
        const datas = await selectSql.getBookToBook(name);
        const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author', 'Number'];
        const post = '/search/book';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        const name = req.body.name;
        const datas = await selectSql.getBookToAuthor(name);
        const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author', 'Number'];
        const post = '/search/author';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.post('/award', async (req, res) => {
    if (req.cookies.user) {
        const name = req.body.name;
        const datas = await selectSql.getBookToAward(name);
        const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author', 'Number'];
        const post = '/search/award';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.post('/basket', async (req, res) => {
    if (req.cookies.user) {
        const data = { Book_ISBN: req.body.ISBN, Number: req.body.quantity, User_Email: req.cookies.user.id};
        await insertSql.insertBasket(data);
        res.redirect('/search/book');
    }
    else
        res.redirect('/');
});

router.post('/reservation', async (req, res) => {
    if (req.cookies.user) {
        const Date = req.body.pickupDateTime.split('T')[0];
        const Time = req.body.pickupDateTime.split('T')[1];

        const data = { Book_ISBN: req.body.ISBN, User_Email: req.cookies.user.id, Date: Date, Time: Time};
        await insertSql.insertReservation(data);
        res.redirect('/search/book');
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