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
    if (req.cookies.user) {
        res.redirect('/select/basket');
    }
    else
        res.redirect('/');
});

router.get('/basket', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getBasket();
        const columns = ['ISBN', 'BasketID', 'OrderDate', 'Number'];
        const post = '/select/basket';
        const buttonname = 'Buy';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('basket', { routes, userName, isLoggedIn, datas, columns, post, buttonname });
    }
    else
        res.redirect('/');
});

router.get('/reservation', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getReservation();
        const columns = ['ISBN', 'ID', 'OrderDate', 'PickupTime'];
        const post = '/select/reservation';
        const buttonname = 'Modify';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('reservation', { routes, userName, isLoggedIn, datas, columns, post, buttonname });
    }
    else
        res.redirect('/');
});

router.post('/reservation/update', async (req, res) => {
    if (req.cookies.user) {
        const { RID, pickupDateTime } = req.body;

        const date = pickupDateTime.split('T')[0];
        const time = pickupDateTime.split('T')[1];

        console.log(RID, date, time);

        res.redirect('/select/reservation');
    }
    else
        res.redirect('/');
});

router.post('/reservation/cancel', async (req, res) => {
    if (req.cookies.user) {
        const { RID, pickupDateTime } = req.body;

        console.log(RID);

        res.redirect('/select/reservation');
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