import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
import { updateSql } from "../database/sql";
import { deleteSql } from "../database/sql";
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
        const datas = await selectSql.getBasket(req.cookies.user.id);
        const columns = ['ISBN', 'BasketID', 'OrderDate', 'Number'];
        const buttonname = 'Buy';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('basket', { routes, userName, isLoggedIn, datas, columns, buttonname });
    }
    else
        res.redirect('/');
});

router.get('/reservation', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getReservation(req.cookies.user.id);
        const columns = ['ISBN', 'ID', 'OrderDate', 'PickupTime'];
        const buttonname = 'Modify';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        res.render('reservation', { routes, userName, isLoggedIn, datas, columns, buttonname });
    }
    else
        res.redirect('/');
});

router.post('/reservation/update', async (req, res) => {
    if (req.cookies.user) {
        const Date = req.body.pickupDateTime.split('T')[0];
        const Time = req.body.pickupDateTime.split('T')[1];
        const data = { RID: req.body.RID, ISBN: req.body.ISBN, Date: Date, Time: Time, user: req.cookies.user.id };

        const result = await updateSql.updateReservation(data);
        exceptionResult(res, result, '/reservation');
    }
    else
        res.redirect('/');
});

router.post('/reservation/cancel', async (req, res) => {
    if (req.cookies.user) {
        const data = { RID: req.body.RID, ISBN: req.body.ISBN, user: req.cookies.user.id };
        await deleteSql.deleteReservation(data);

        res.redirect('/select/reservation');
    }
    else
        res.redirect('/');
});

router.post('/basket/buy', async (req, res) => {
    if (req.cookies.user) {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var dateString = year + '-' + month + '-' + day;

        const data = { Book_ISBN: req.body.Book_ISBN, BasketID: req.body.BasketID, user: req.cookies.user.id, Date: dateString };
        await updateSql.updateBasket(data);

        res.redirect('/select/basket');
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

function exceptionResult(res, result, page) {
    if (result === 'success')
        res.redirect('/select' + page);
    else
        return res.send(`<script> 
                alert("update failed! Error: ${result}");
                window.location.href = '/select${page}';
                 </script>`);
}