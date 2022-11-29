const express = require('express');
const router = express.Router();

const shopController = require('../app/controllers/ShopController');

router.get('/:slug', shopController.single);
router.get('/', shopController.index);

module.exports = router;
