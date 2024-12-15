import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
import { deleteSql } from "../database/sql";
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {

    if (req.cookies.user) {
        var path = '/delete';

        if (req.cookies.user.curPage === '') {
            path += '/book';
        }
        else
            path += req.cookies.user.curPage;

        res.redirect(path);
    }
    else
        res.redirect('/');
});

router.get('/book', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getBook();
        const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author'];
        const page = '/book';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});

router.get('/author', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getAuthor();
        const columns = ['Name', 'Address', 'URL'];
        const page = '/author';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});

router.get('/award', async (req, res) => {
    if (req.cookies.user) {
        const datas = await selectSql.getAward();
        const columns = ['Name', 'Year', 'Book_ISBN'];
        const page = '/award';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});

router.get('/warehouse', async (req, res) => {
    if (req.cookies.user) {
        let datas = await selectSql.getWarehouse();
        const columns = ['Code', 'PhoneNum', 'Address'];
        const page = '/warehouse';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});

router.get('/inventory', async (req, res) => {
    if (req.cookies.user) {
        let datas = await selectSql.getInventory();
        const columns = ['Warehouse_Code', 'Book_ISBN', 'Number'];
        const page = '/inventory';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});

router.get('/Contains', async (req, res) => {
    if (req.cookies.user) {
        let datas = await selectSql.getContains();
        const columns = ['BasketID', 'User_Email', 'Book_ISBN', 'Number'];
        const page = '/contains';
        getPage(req, res, datas, columns, page);
    }
    else
        res.redirect('/');
});


router.post('/book', async (req, res) => {
    const result = await deleteSql.deleteBook(req.body);
    exceptionResult(res, result, '/book');
});

router.post('/author', async (req, res) => {
    const result = await deleteSql.deleteAuthor(req.body);
    exceptionResult(res, result, '/author');
});


router.post('/award', async (req, res) => {
    const result = await deleteSql.deleteAward(req.body);
    exceptionResult(res, result, '/award');
});


router.post('/warehouse', async (req, res) => {
    const result = await deleteSql.deleteWarehouse(req.body);
    exceptionResult(res, result, '/warehouse');
});


router.post('/inventory', async (req, res) => {
    const result = await deleteSql.deleteInventory(req.body);
    exceptionResult(res, result, '/inventory');
});


router.post('/contains', async (req, res) => {
    const result = await deleteSql.deleteContains(req.body);
    exceptionResult(res, result, '/contains');
});


module.exports = router;

function getRoutes() {
    const routes = [
        { path: '/delete/book', label: '+ Book' },
        { path: '/delete/Author', label: '+ Author' },
        { path: '/delete/Award', label: '+ Award' },
        { path: '/delete/Warehouse', label: '+ Warehouse' },
        { path: '/delete/Inventory', label: '+ Inventory' },
        { path: '/delete/Contains', label: '+ Contains' },
    ];

    return routes;
}

function getPage(req, res, rawDatas, columns, page) {
    const datas = rawDatas.map(rawData => {
        return Object.entries(rawData).map(([key, value], index) => ({ key, value, }));
    });

    const post = '/delete' + page;
    const routes = getRoutes();
    const userName = req.cookies.user.name;
    const isLoggedIn = true;

    const updatedUser = { ...req.cookies.user, curPage: page };
    res.cookie('user', updatedUser, { httpOnly: true, maxAge: 300000 });
    res.render('delete', { routes, userName, isLoggedIn, datas, columns, post });
}

function exceptionResult(res, result, page) {
    if (result === 'success')
        res.redirect('/delete' + page);
    else
        return res.send(`<script> 
                alert("delete failed! Error: ${result}");
                window.location.href = '/delete${page}';
                 </script>`);
}