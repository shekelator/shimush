var http = require('http');
var koa = require('koa');
var views = require('koa-views');
var app = koa();


app.use(views('views', {
	cache: true,
	map: {
		html: 'underscore'
	}
}));

app.use(function *() {
	yield this.render('index.html', {
		title: "My page"
	});
});

var port = process.env.PORT || 3000
app.listen(port);
