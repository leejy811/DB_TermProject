import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";
import { updateSql } from "../database/sql";
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {

    if (req.cookies.user)
    { 
        var path ='/update';

        if(req.cookies.user.curPage === '') {
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
    if (req.cookies.user)
    { 
        const datas = await selectSql.getBook();
        const columns = ['ISBN', 'Year', 'Title', 'Price', 'Category', 'Author'];
        const isUpdates = [false, true, true, true, true, true];
        const page = '/book';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});

router.get('/author', async (req, res) => {
    if (req.cookies.user)
    { 
        const datas = await selectSql.getAuthor();
        const columns = ['ID', 'Name', 'Address', 'URL'];
        const isUpdates = [false, true, true, true];
        const page = '/author';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});

router.get('/award', async (req, res) => {
    if (req.cookies.user)
    { 
        const datas = await selectSql.getAward();
        const columns = ['ID', 'Name', 'Year', 'Book_ISBN', 'Author_ID'];
        const isUpdates = [false, true, true, true, true];
        const page = '/award';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});

router.get('/warehouse', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getWarehouse();
        const columns = ['Code', 'PhoneNum', 'Address'];
        const isUpdates = [false, true, true];
        const page = '/warehouse';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});

router.get('/inventory', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getInventory();
        const columns = ['Warehouse', 'Book', 'Number'];
        const isUpdates = [false, false, true];
        const page = '/inventory';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});

router.get('/contains', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getContains();
        const columns = ['Customer_ID', 'Book_ISBN', 'BasketID', 'OrderDate', 'Number'];
        const isUpdates = [false, false, false, false, true];
        const page = '/contains';
        getPage(req, res, datas, columns, page, isUpdates);
    }
    else
        res.redirect('/');
});


router.post('/book', async (req, res) => {
    const result = await updateSql.updateBook(req.body);
    exceptionResult(res, result, '/book');
});

router.post('/author', async (req, res) => {
    const result = await updateSql.updateAuthor(req.body);
    exceptionResult(res, result, '/author');
});

router.post('/award', async (req, res) => {
    const result = await updateSql.updateAward(req.body);
    exceptionResult(res, result, '/award');
});

router.post('/warehouse', async (req, res) => {
    const result = await updateSql.updateWarehouse(req.body);
    exceptionResult(res, result, '/warehouse');
});

router.post('/inventory', async (req, res) => {
    const result = await updateSql.updateInventory(req.body);
    exceptionResult(res, result, '/inventory');
});

router.post('/contains', async (req, res) => {
    const result = await updateSql.updateContains(req.body);
    exceptionResult(res, result, '/contains');
});

module.exports = router;

function getRoutes(){
    const routes = [
        { path: '/update/book', label: '+ Book' },
        { path: '/update/Author', label: '+ Author' },
        { path: '/update/Award', label: '+ Award' },
        { path: '/update/Warehouse', label: '+ Warehouse' },
        { path: '/update/Inventory', label: '+ Inventory' },
        { path: '/update/Contains', label: '+ Contains' },
    ];

    return routes;
}

function getPage(req, res, rawDatas, columns, page, isUpdates) {
    const datas = rawDatas.map(rawData => {
        return Object.entries(rawData).map(([key, value], index) => ({
            key,
            value,
            isUpdate: isUpdates[index]
        }));
    });

    const post = '/update' + page;
    const routes = getRoutes();
    const userName = req.cookies.user.name;
    const isLoggedIn = true;

    const updatedUser = { ...req.cookies.user, curPage: page };
    res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
    res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
}

function exceptionResult(res, result, page) {
    if (result === 'success')
        res.redirect('/update' + page);
    else
        return res.send(`<script> 
                alert("update failed! Error: ${result}");
                window.location.href = '/update${page}';
                 </script>`);
}