var http = require('http');
var koa = require('koa');
var views = require('koa-views');
var handlebars = require('koa-handlebars');
var routing = require('koa-routing');
var passport = require("koa-passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var app = koa();

app.use(handlebars({
	defaultLayout: "main"
}));

passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_APPID,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: "http://" + process.env.HOSTNAME + "/callback"
},
	function(accessToken, refreshToken, profile, done) {
		console.log("Received token for " + profile.name.familyName);
	}
));

app.use(passport.initialize());
app.use(passport.session());
app.use(routing(app));

app.route('/')
	.get(function * (next) {
		yield this.render('welcome', {});
		yield next;
	});

app.route('/auth/facebook').get(passport.authenticate('facebook'));

app.route('/auth/facebook/callback').get(
	passport.authenticate('facebook', {successRedirect: '/signup', failureRedirect: '/failed'})
);

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
	});

app.route('/failed')
	.get(function*(next) {
		yield this.render('failed', {});
	});

app.use(function*(next) {
	if(this.isAuthenticated()) {
		yield next;
	} else {
		this.redirect("/");
	}
});

var port = process.env.PORT || 3000
app.listen(port);
