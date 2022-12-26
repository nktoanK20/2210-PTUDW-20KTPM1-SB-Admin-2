const Customer = require('../models/Customer');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class CustomerService {
	getOne(_id, email) {
		if (_id) {
			return Customer.findById(_id).then((user) => {
				return mongooseToObject(user);
			});
		} else if (email) {
			return Customer.findOne({ email: email }).then((user) => {
				return mongooseToObject(user);
			});
		}
	}

	get(sortBy, sortType, page, limit) {
		let _sortBy = 'createdAt';
		let _sortType = 'desc';

		if (sortBy) {
			_sortBy = sortBy;
			_sortType = sortType;
		}

		return Customer.find()
			.skip(page * limit)
			.limit(limit)
			.sort({ [_sortBy]: _sortType })
			.then((customers) => {
				return multipleMongooseToObject(customers);
			});
	}

	count() {
		return Customer.countDocuments().then((total) => {
			return total;
		});
	}

	save(data) {
		const customer = new Customer(data);
		return customer.save();
	}

	updateOne(_id, data) {
		return Customer.updateOne({ _id: _id }, data);
	}
}

module.exports = new CustomerService();
