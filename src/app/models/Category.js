const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Product_Category', CategorySchema);
