const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/account-list-customer', siteController.account_list_customer);
router.get('/account-list-admin', siteController.account_list_admin);
router.post('/account-detail', siteController.account_detail);
router.put('/account-ban', siteController.account_ban);

router.get('/product-category', siteController.product_category);
router.get('/product-category-edit', siteController.product_category_edit);
router.put('/product-category-edit', siteController.product_category_update);
router.get('/product-category-create', siteController.product_category_create);
router.post('/product-category-create', siteController.product_category_save);

router.get('/product-list', siteController.product_list);
router.get('/product-edit', siteController.product_edit);
router.put('/product-edit', siteController.product_update);
router.get('/product-create', siteController.product_create);
router.post('/product-create', siteController.product_save);

router.get('/', siteController.account_list_customer);

module.exports = router;
