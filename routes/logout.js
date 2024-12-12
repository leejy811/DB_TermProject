import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

router.post('/', async (req, res) => {

});

module.exports = router;
