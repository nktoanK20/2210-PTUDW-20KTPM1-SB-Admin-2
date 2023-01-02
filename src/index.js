if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const sortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());
app.use(methodOverride('_method'));

//custom middlewares
app.use(sortMiddleware);

app.use(morgan('combined'));

app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
		helpers: {
			sortable_account: (userType, field, sort, currentPage) => {
				const sortType =
					field === sort.sortBy ? sort.sortType : 'default';
				const icons = {
					default: 'fa fa-sort',
					asc: 'fa fa-sort-up',
					desc: 'fa fa-sort-down',
				};

				const types = {
					default: 'desc',
					asc: 'desc',
					desc: 'asc',
				};

				const icon = icons[sortType];
				const type = types[sortType];

				return `<a href='/account-list-${userType}?sortBy=${field}&sortType=${type}&page=${currentPage}'>
					<span class='${icon}'></span>
				</a>`;
			},
			sortable_product: (field, sort, currentPage) => {
				const sortType =
					field === sort.sortBy ? sort.sortType : 'default';
				const icons = {
					default: 'fa fa-sort',
					asc: 'fa fa-sort-up',
					desc: 'fa fa-sort-down',
				};

				const types = {
					default: 'desc',
					asc: 'desc',
					desc: 'asc',
				};

				const icon = icons[sortType];
				const type = types[sortType];

				return `<a href='/product-list?sortBy=${field}&sortType=${type}&page=${currentPage}'>
					<span class='${icon}'></span>
				</a>`;
			},
			paginate_account: (userType, _sort, totalPages, currentPage) => {
				let result = '';
				for (let i = 1; i <= totalPages; i++) {
					if (currentPage === i) {
						result += `<li class="page-item active">
                        <a href="/account-list-${userType}?sortBy=${_sort.sortBy}&sortType=${_sort.sortType}&page=${i}" class="page-link">${i}</a>
                		</li>`;
					} else {
						result += `<li class="page-item">
                        <a href="/account-list-${userType}?sortBy=${_sort.sortBy}&sortType=${_sort.sortType}&page=${i}" class="page-link">${i}</a>
						</li>`;
					}
				}
				return result;
			},
			paginate_product: (_sort, totalPages, currentPage) => {
				let result = '';
				for (let i = 1; i <= totalPages; i++) {
					if (currentPage === i) {
						result += `<li class="page-item active">
                        <a href="/product-list?sortBy=${_sort.sortBy}&sortType=${_sort.sortType}&page=${i}" class="page-link">${i}</a>
                		</li>`;
					} else {
						result += `<li class="page-item">
                        <a href="/product-list?sortBy=${_sort.sortBy}&sortType=${_sort.sortType}&page=${i}" class="page-link">${i}</a>
						</li>`;
					}
				}
				return result;
			},
			displayImageLinkFields: (images) => {
				let result = `<div class="row">
					<div class="pt-2 pl-3">
						<a onclick="addImageLinkField(this)" class="add-button" title="Add Field"><i
								class="fa fa-plus" aria-hidden="true"></i></i></a>
					</div>
					<div class="col-md">
						<input type="text" class="form-control" name="images[]" placeholder=""
							value="${images[0]}">
					</div>
				</div>`;

				for (let i = 1; i < images.length; i++) {
					result += `<div class="row mt-2">
						<div class="pt-2 pl-3">
							<a onclick="removeImageLinkField(this)" class="remove-button" title="Remove Field">
								<i class="fa fa-minus" aria-hidden="true"></i></a>
						</div>
						<div class="col-md">
							<input type="text" class="form-control" name="images[]" placeholder=""
								value="${images[i]}">
						</div>
					</div>`;
				}
				return result;
			},
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set lại path của thư mục views

route(app);

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
