const Product = require('../models/Product');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class ProductService {
	getOne(key, value) {
		return Product.findOne({ [key]: value }).then((product) => {
			return mongooseToObject(product);
		});
	}

	get(category, sortBy, sortType, page, limit) {
		let _category = 'all';
		let _sortBy = 'createdAt';
		let _sortType = 'desc';

		if (category != 'all' && category) {
			_category = category;
		}

		if (sortBy) {
			_sortBy = sortBy;
			_sortType = sortType;
		}

		let querySelector = _category === 'all' ? {} : { category: _category };
		return Product.find(querySelector)
			.skip(page * limit)
			.limit(limit)
			.sort({ [_sortBy]: _sortType })
			.then((products) => {
				return multipleMongooseToObject(products);
			});
	}

	count(category) {
		let _category = 'all';

		if (category != 'all' && category) {
			_category = category;
		}

		let querySelector = _category === 'all' ? {} : { category: _category };
		return Product.countDocuments(querySelector).then((total) => {
			return total;
		});
	}

	save(data) {
		const product = new Product(data);
		return product.save();
	}

	updateOne(_id, data) {
		return Product.updateOne({ _id: _id }, data);
	}
}

module.exports = new ProductService();
