const Admin = require('../models/Admin');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class AdminService {
	getOne(_id, email) {
		if (_id) {
			return Admin.findById(_id).then((user) => {
				return mongooseToObject(user);
			});
		} else if (email) {
			return Admin.findOne({ email: email }).then((user) => {
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

		return Admin.find()
			.skip(page * limit)
			.limit(limit)
			.sort({ [_sortBy]: _sortType })
			.then((admins) => {
				return multipleMongooseToObject(admins);
			});
	}

	count() {
		return Admin.countDocuments().then((total) => {
			return total;
		});
	}

	save(data) {
		const admin = new Admin(data);
		return admin.save();
	}

	updateOne(_id, data) {
		return Admin.updateOne({ _id: _id }, data);
	}
}

module.exports = new AdminService();
