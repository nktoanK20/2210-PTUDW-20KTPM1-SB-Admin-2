const { response } = require('express');

class SiteController {
	// [GET] /about
	contact(req, res, next) {
		res.render('site/contact');
	}

	// [GET] /about
	about(req, res, next) {
		res.render('site/about');
	}

	// [GET] /index (home page)
	index(req, res, next) {
		res.render('site/index');
	}
}

module.exports = new SiteController();
