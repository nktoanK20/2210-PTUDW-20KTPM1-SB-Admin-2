const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
router.get('/login', siteController.login);
router.get('/register', siteController.register);
router.get('/forgot-password', siteController.forgot_password);
router.get('/charts', siteController.charts);
router.get('/tables', siteController.tables);
router.get('/', siteController.index);

module.exports = router;
