const CustomerService = require('../models/CustomerService');
const AdminService = require('../models/AdminService');
const CategoryService = require('../models/CategoryService');
const ProductService = require('../models/ProductService');
const OrderService = require('../models/OrderService');

class SiteController {
	// [GET] /account-list-customer
	async account_list_customer(req, res, next) {
		let page = 0;
		if (req.query.page > 0) {
			page = req.query.page - 1;
		}
		const limit = process.env.ACCOUNT_LIMIT_PER_PAGE;

		let customers = await CustomerService.get(
			req.query.sortBy,
			req.query.sortType,
			page,
			limit,
		);

		const totalPages = Math.ceil((await CustomerService.count()) / limit);

		res.render('site/account-list-customer', {
			customers,
			totalPages,
			currentPage: page + 1,
		});
	}

	// [GET] /account-list-admin
	async account_list_admin(req, res, next) {
		let page = 0;
		if (req.query.page > 0) {
			page = req.query.page - 1;
		}
		const limit = process.env.ACCOUNT_LIMIT_PER_PAGE;

		let admins = await AdminService.get(
			req.query.sortBy,
			req.query.sortType,
			page,
			limit,
		);

		const totalPages = Math.ceil((await AdminService.count()) / limit);

		res.render('site/account-list-admin', {
			admins,
			totalPages,
			currentPage: page + 1,
		});
	}

	// [POST] /account-detail
	async account_detail(req, res, next) {
		let user;
		if (req.body.customerId) {
			user = await CustomerService.getOne(req.body.customerId);
		} else if (req.body.adminId) {
			user = await AdminService.getOne(req.body.adminId);
		}

		res.render('site/account-detail', { user });
	}

	// [POST] /account-ban
	async account_ban(req, res, next) {
		if (req.query.hasOwnProperty('ban')) {
			await CustomerService.updateOne(req.body.customerId, {
				enabled: false,
			});
		} else if (req.query.hasOwnProperty('unban')) {
			await CustomerService.updateOne(req.body.customerId, {
				enabled: true,
			});
		}
		let queryString =
			'?sortBy=' +
			req.query.sortBy +
			'&sortType=' +
			req.query.sortType +
			'&page=' +
			req.query.page;
		res.redirect('/account-list-customer' + queryString);
	}

	async product_category(req, res, next) {
		let categories = await CategoryService.getAll();

		res.render('site/product-category', { categories });
	}

	async product_category_edit(req, res, next) {
		let category = await CategoryService.getOne(
			'_id',
			req.query.categoryId,
		);

		res.render('site/product-category-edit', { category });
	}

	async product_category_update(req, res, next) {
		await CategoryService.updateOne(req.body._id, req.body);

		res.redirect('/product-category');
	}

	async product_category_create(req, res, next) {
		res.render('site/product-category-create');
	}

	async product_category_save(req, res, next) {
		await CategoryService.save(req.body);

		res.redirect('/product-category');
	}

	async product_list(req, res, next) {
		let page = 0;
		if (req.query.page > 0) {
			page = req.query.page - 1;
		}
		const limit = process.env.PRODUCT_LIMIT_PER_PAGE;

		let products = await ProductService.get(
			'all',
			req.query.sortBy,
			req.query.sortType,
			page,
			limit,
		);

		const totalPages = Math.ceil((await ProductService.count()) / limit);

		res.render('site/product-list', {
			products,
			totalPages,
			currentPage: page + 1,
		});
	}

	async product_edit(req, res) {
		let product = await ProductService.getOne('_id', req.query.productId);
		let categories = await CategoryService.getAll();

		res.render('site/product-edit', { product, categories });
	}

	async product_update(req, res, next) {
		await ProductService.updateOne(req.body._id, req.body);

		res.redirect('/product-list');
	}

	async product_create(req, res, next) {
		let message = req.query.message === '' ? '' : req.query.message;
		let categories = await CategoryService.getAll();
		res.render('site/product-create', { categories, message });
	}

	async product_save(req, res, next) {
		await ProductService.save(req.body);

		res.redirect('/product-create?message=Create Product Successfully!');
	}

	// [GET] /order-list
	async order_list(req, res, next) {
		let status = req.query.status;
		if (!status) {
			status = 'preparing';
		}

		let orders = await OrderService.get('status', status);
		for (let i = 0; i < orders.length; i++) {
			orders[i]['customer'] = await CustomerService.getOne(
				orders[i].customerId,
				null,
			);
		}

		res.render('site/order-list', {
			orders,
			message: req.query.message,
			status,
		});
	}

	//[GET] /order-edit/:id
	async order_edit(req, res, next) {
		let order = await OrderService.getOne('_id', req.params.id);
		order['customer'] = await CustomerService.getOne(
			order.customerId,
			null,
		);

		res.render('site/order-edit', {
			order,
			totalItems: Object.keys(order.items).length,
		});
	}

	//[PUT] /order-edit/:id
	async order_update(req, res, next) {
		let status = req.body.status;
		console.log(status);
		await OrderService.updateOne(req.params.id, { status: status });

		res.redirect('/order-list?message=Order Updated!');
	}

	//[GET] /report
	async report_show(req, res, next) {
		res.render('site/test1');
	}

	// [GET] /index (home page)
	index(req, res, next) {
		res.render('site/account-list-customer');
	}
}

module.exports = new SiteController();
