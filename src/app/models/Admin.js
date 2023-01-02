const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		phoneNumber: { type: String },
		enabled: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Admin', AdminSchema);
