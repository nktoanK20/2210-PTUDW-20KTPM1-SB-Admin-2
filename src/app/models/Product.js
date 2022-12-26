const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true, default: 0 },
		brand: { type: String },
		description: { type: String },
		specification: { type: String },
		quantity: { type: Number, default: 0 },
		thumbnail: { type: String },
		images: { type: Array },
		slug: { type: String, slug: 'name', unique: true },
		category: { type: String, required: true },
		discount: { type: Number },
		status: { type: String },
		totalPurchase: { type: Number, default: 0 },
		status: { type: String },
	},
	{
		timestamps: true,
	},
);

mongoose.plugin(slug);

module.exports = mongoose.model('Product', ProductSchema);
