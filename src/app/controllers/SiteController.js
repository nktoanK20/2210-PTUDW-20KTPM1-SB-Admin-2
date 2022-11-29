const { response } = require('express');

class SiteController {
	// [GET] /login
	login(req, res, next) {
		res.render('site/login', { layout: 'login' });
	}

	// [GET] /register
	register(req, res, next) {
		res.render('site/register', { layout: 'login' });
	}

	// [GET] /forget-password
	forgot_password(req, res, next) {
		res.render('site/forgot-password', { layout: 'login' });
	}

	// [GET] /charts
	charts(req, res, next) {
		res.render('site/charts');
	}

	// [GET] /tables
	tables(req, res, next) {
		res.render('site/tables');
	}

	// [GET] /index (home page)
	index(req, res, next) {
		res.render('site/index');
	}
}

module.exports = new SiteController();
