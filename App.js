const express = require('express');
const path = require('path');
const app = express();
const productRouter = require('./App/products/routes');
const productRouterV2 = require('./App/product-v2/routes');
const logger = require('morgan');
const router = require('./App/products/routes');


// Module Router
app.use(router);

app.use(logger('dev'));

// Menangani Request Body dengan Middleware
app.use(express.urlencoded({extended: true}));

// Menangani Request Body dengan Middleware Json
app.use(express.json());

// Menangani File Static
app.use('/public', express.static(path.join(__dirname, 'uploads', )));

app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);

// Menangani Error 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(3001, () => console.log('Server: http://localhost:3001'));