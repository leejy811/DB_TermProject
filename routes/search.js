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

router.get('/', async (req, res) => {
    if (req.cookies.user)
        { 
            res.redirect('/search/book');
        }
        else
            res.redirect('/');
});

router.get('/book', async (req, res) => {
    if (req.cookies.user)
        { 
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
    if (req.cookies.user)
        { 
            const post = '/search/book';
            const routes = getRoutes();
            const userName = req.cookies.user.name;
            const isLoggedIn = true;

            res.render('search', { routes, userName, isLoggedIn, post });
        }
        else
            res.redirect('/');
});

router.get('/award', async (req, res) => {
    if (req.cookies.user)
        { 
            const post = '/search/book';
            const routes = getRoutes();
            const userName = req.cookies.user.name;
            const isLoggedIn = true;

            res.render('search', { routes, userName, isLoggedIn, post });
        }
        else
            res.redirect('/');
});

router.post('/book', async (req, res) => {
    if (req.cookies.user)
        { 
            const name = req.body.name;
            const datas = await selectSql.getBookToBook(name);
            const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author'];
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
    if (req.cookies.user)
        { 
            const name = req.body.name;
            const datas = await selectSql.getBookToAuthor(name);
            const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author'];
            const post = '/search/book';
            const routes = getRoutes();
            const userName = req.cookies.user.name;
            const isLoggedIn = true;

            res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
        }
        else
            res.redirect('/');
});

router.post('/award', async (req, res) => {
    if (req.cookies.user)
        { 
            const name = req.body.name;
            const datas = await selectSql.getBookToAward(name);
            const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author'];
            const post = '/search/book';
            const routes = getRoutes();
            const userName = req.cookies.user.name;
            const isLoggedIn = true;

            res.render('search', { routes, userName, isLoggedIn, datas, columns, post });
        }
        else
            res.redirect('/');
});

module.exports = router;

function getRoutes(){
    const routes = [
        { path: '/search', label: '+ Search Book' },
        { path: '/select/basket', label: '+ Shopping basket' },
        { path: '/select/reservation', label: '+ Reservation' },
    ];

    return routes;
}