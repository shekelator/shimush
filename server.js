var http = require('http');
var koa = require('koa');
var views = require('koa-views');
var handlebars = require('koa-handlebars');
var routing = require('koa-routing');
var app = koa();

app.use(handlebars({
	defaultLayout: "main"
}));

app.use(routing(app));

app.route('/')
	.get(function * (next) {
		yield this.render('welcome', {});
		yield next;
	});

app.route('/signup')
	.get(function * (next) {
		yield this.render('signup', {
			name: "Parashat Eikev",
			duties: [{
				description: "Torah",
				details: "Deuteronomy 7.12-11.25",
				volunteer: "Sammy Chateau"
			},
			{
				description: "Haftarah",
				details: "Isaiah 49.14-51.3"
			}]
		});

		yield next;
	})

var port = process.env.PORT || 3000
app.listen(port);
