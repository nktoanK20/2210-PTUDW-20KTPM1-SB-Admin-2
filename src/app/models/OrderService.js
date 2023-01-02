const Order = require('../models/Order');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class OrderService {
	getAll() {
		return Order.find({})
			.sort({ createdAt: 'desc' })
			.then((orders) => {
				return multipleMongooseToObject(orders);
			});
	}

	getOne(key, value) {
		return Order.findOne({ [key]: value }).then((order) => {
			return mongooseToObject(order);
		});
	}

	get(key, value) {
		return Order.find({ [key]: value })
			.sort({ createdAt: 'desc' })
			.then((orders) => {
				return multipleMongooseToObject(orders);
			});
	}

	save(data) {
		const order = new Order(data);
		return order.save();
	}

	updateOne(_id, data) {
		return Order.updateOne({ _id: _id }, data);
	}
}

module.exports = new OrderService();
