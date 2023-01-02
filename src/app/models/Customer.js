const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CustomerSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		phoneNumber: { type: String },
		address: { type: Object },
		payments: { type: Array },
		cart: { type: Object },
		avatar: {
			type: String,
			default:
				'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
			required: true,
		},
		enabled: { type: Boolean },
	},
	{
		timestamps: true,
	},
);

CustomerSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

CustomerSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Customer', CustomerSchema);
