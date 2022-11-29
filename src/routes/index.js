const siteRouter = require('./site');
const shopRouter = require('./shop');

function route(app) {
	app.use('/shop', shopRouter);
	app.use('/', siteRouter);
}

module.exports = route;
