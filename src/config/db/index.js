const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose
			.connect(process.env.DB_CONNECT, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log('Connecting to MongoDB succeeded.'));
	} catch (error) {
		console.log('Connecting to MongoDB failed.');
	}
}

module.exports = { connect };
