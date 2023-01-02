const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
		items: { type: Object },
		totalQuantity: { type: Number },
		totalPrice: { type: Number, required: true },
		shippingDetails: { type: Object, required: true },
		paymentMethod: { type: String, required: true },
		status: { type: String, required: true, default: 'preparing' },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Order', OrderSchema);
