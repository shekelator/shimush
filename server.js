var http = require('http');
var koa = require('koa');
var views = require('koa-views');
var routing = require('koa-routing');
var app = koa();

app.use(views('views', {
	cache: true,
	map: {
		html: 'underscore'
	}
}));
app.use(routing(app));

app.route('/signup')
	.get(function * (next) {
		yield this.render('index.html', {
			name: "Parashat Eikev",
			torahReading: "Deuteronomy 7.12-11.25",
			haftarahReading: "Isaiah 49.14-51.3"
		});

		yield next;
	})

var port = process.env.PORT || 3000
app.listen(port);
