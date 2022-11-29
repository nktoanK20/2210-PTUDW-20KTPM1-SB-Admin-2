const { response } = require('express');

class ShopController {
	// [GET] /:slug (detail of a product in shop)
	single(req, res, next) {
		res.render('shop/single');
	}

	// [GET] /index (shop section homepage)
	index(req, res, next) {
		res.render('shop/index');
	}
}

module.exports = new ShopController();
