const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

const homeRouter = require('./routes/home.routes');
const orderRouter = require('./routes/order.routes');
const managementRouter = require('./routes/management.routes');

//posatvljanje lokacije view templatea
app.set('views', path.join(__dirname, 'views'));
//biranje view engina
app.set('view engine', 'ejs');


app.use(express.urlencoded({
    extended: true
}));


app.use('/', homeRouter);
app.use('/order', orderRouter);
app.use('/management', managementRouter);


app.listen(80); //nije receno koji port, pa deafault = 80