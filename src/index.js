import express from 'express';
import logger from 'morgan';
import path from 'path';
import expressSession from "express-session";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from '../routes/login';
import insertRouter from '../routes/insert';
import updateRouter from '../routes/update';
import deleteRouter from '../routes/delete';
import searchRouter from '../routes/search';
import selectRouter from '../routes/select';

const PORT = 3000;

const liveReloadServer = liveReload.createServer(); 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use('/', loginRouter);
app.use('/insert', insertRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/search', searchRouter);
app.use('/select', selectRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});