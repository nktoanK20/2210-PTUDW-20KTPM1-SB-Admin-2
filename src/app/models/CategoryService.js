const Category = require('../models/Category');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class CategoryService {
	getOne(field, value) {
		return Category.findOne({ [field]: value }).then((category) => {
			return mongooseToObject(category);
		});
	}

	getAll() {
		return Category.find().then((categories) => {
			return multipleMongooseToObject(categories);
		});
	}

	get(sortBy, sortType, page, limit) {
		let _sortBy = 'createdAt';
		let _sortType = 'desc';

		if (sortBy) {
			_sortBy = sortBy;
			_sortType = sortType;
		}

		return Category.find()
			.skip(page * limit)
			.limit(limit)
			.sort({ [_sortBy]: _sortType })
			.then((categories) => {
				return multipleMongooseToObject(categories);
			});
	}

	count() {
		return Category.countDocuments().then((total) => {
			return total;
		});
	}

	save(data) {
		const category = new Category(data);
		return category.save();
	}

	updateOne(id, data) {
		return Category.updateOne({ _id: id }, data);
	}
}

module.exports = new CategoryService();
