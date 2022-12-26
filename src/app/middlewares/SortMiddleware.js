module.exports = function SortMiddleware(req, res, next) {
	res.locals._sort = {
		sortBy: 'createdAt',
		sortType: 'desc',
	};
	if (req.query.sortBy) {
		Object.assign(res.locals._sort, {
			sortBy: req.query.sortBy,
			sortType: req.query.sortType,
		});
	}
	next();
};
