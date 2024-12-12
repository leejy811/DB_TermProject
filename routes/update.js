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
        const post = '/update/book';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;

        const updatedUser = { ...req.cookies.user, curPage: '/book' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.get('/Author', async (req, res) => {
    if (req.cookies.user)
    { 
        const datas = await selectSql.getAuthor();
        const columns = ['Name', 'Address', 'URL'];
        const post = '/update/author';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;
        
        const updatedUser = { ...req.cookies.user, curPage: '/Author' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.get('/Award', async (req, res) => {
    if (req.cookies.user)
    { 
        const datas = await selectSql.getAward();
        const columns = ['Book', 'Name', 'Year'];
        const post = '/update/Award';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;
        
        const updatedUser = { ...req.cookies.user, curPage: '/Award' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.get('/Warehouse', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getWarehouse();
        const columns = ['Code', 'PhoneNum', 'Address'];
        const post = '/update/Warehouse';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;
        
        const updatedUser = { ...req.cookies.user, curPage: '/Warehouse' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.get('/Inventory', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getInventory();
        const columns = ['Warehouse', 'Book', 'Number'];
        const post = '/update/Inventory';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;
        
        const updatedUser = { ...req.cookies.user, curPage: '/Inventory' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});

router.get('/Contains', async (req, res) => {
    if (req.cookies.user)
    { 
        let datas = await selectSql.getContains();
        const columns = ['Customer', 'Book', 'Number'];
        const post = '/update/Contains';
        const routes = getRoutes();
        const userName = req.cookies.user.name;
        const isLoggedIn = true;
        
        const updatedUser = { ...req.cookies.user, curPage: '/Contains' };
        res.cookie('user', updatedUser, { httpOnly: true, maxAge: 3600000 });
        res.render('update', { routes, userName, isLoggedIn, datas, columns, post });
    }
    else
        res.redirect('/');
});


router.post('/book', async (req, res) => {
    var body = req.body;
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