'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _orm = require('orm');

var _orm2 = _interopRequireDefault(_orm);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoStore = require('connect-mongo')(_expressSession2.default);

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use((0, _cookieParser2.default)());

var orm_db;

app.use(_orm2.default.express('mongodb://localhost/spartanshop', {
  define: function (db, models, next) {
    orm_db = db;

    models.User = db.define("User", {
      username: { type: "text", unique: true },
      password: String
    });

    models.Post = db.define("Post", {
      image: Buffer,
      title: String,
      description: String,
      price: Number,
      // user: String,
      timestamp: Number
    });

    models.Post.hasOne('user', models.User, { reverse: 'posts' });

    models.Comment = db.define("Comment", {
      // parent: String,
      content: String,
      // user: String,
      hidden: Boolean,
      // reply: String, // Reply to a user
      timestamp: Number
    });

    models.Comment.hasOne('parent', models.Post, { reverse: 'comments' });
    models.Comment.hasOne('user', models.User);
    models.Comment.hasOne('reply', models.User);

    models.Notification = db.define("Notification", {
      post: String,
      comment: String,
      user: String
    });

    // db.drop(function() {});

    next();
  }
}));

app.use(function (req, res, next) {
  return (0, _expressSession2.default)({
    secret: 'huhuhuhuhu',
    store: new MongoStore({ db: orm_db.driver.db })
  })(req, res, next);
});

(0, _api2.default)(app);

app.use('/', _express2.default.static('public'));
app.use('/', _express2.default.static('build'));
app.use('/thirdparty', _express2.default.static('bower_components'));
app.use('/*', _express2.default.static('public/index.html'));

app.listen(process.env.PORT || 8080);
console.log("Listening on 8080...");
//# sourceMappingURL=index.js.map
