
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import orm from 'orm';
import session from 'express-session';
import api from './api';

const MongoStore = require('connect-mongo')(session)

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

var orm_db;

app.use(orm.express('mongodb://localhost/spartanshop', {
  define: function(db, models, next) {
    orm_db = db;

    models.User = db.define("User", {
      username: {type: "text", unique: true},
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

    models.Post.hasOne('user', models.User, {reverse: 'posts'});

    models.Comment = db.define("Comment", {
      // parent: String,
      content: String,
      // user: String,
      hidden: Boolean,
      // reply: String, // Reply to a user
      timestamp: Number
    });

    models.Comment.hasOne('parent', models.Post, {reverse: 'comments'});
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

app.use((req, res, next) => session({
  secret: 'huhuhuhuhu',
  store: new MongoStore({db: orm_db.driver.db})
})(req, res, next));

api(app);

app.use('/', express.static('public'))
app.use('/', express.static('build'))
app.use('/thirdparty', express.static('bower_components'))
app.use('/*', express.static('public/index.html'))

app.listen(8080);
console.log("Listening on 8080...");
