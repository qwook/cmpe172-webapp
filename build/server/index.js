'use strict';

var express = require('express');
var orm = require('orm');

var app = express();

app.use(orm.express('mongodb://localhost/spartanshop', {
  define: function (db, models, next) {
    // start clean every time
    db.drop(function () {
      models.User = db.define("User", {
        username: { type: "text", unique: true },
        password: String
      });

      models.Post = db.define("Post", {
        image: Buffer,
        description: String,
        price: Number,
        user: Number
      });

      models.Comment = db.define("Comment", {
        parent: Number,
        content: String,
        user: Number
      });

      next();
    });
  }
}));

app.use('/', express.static('build'));
app.use('/', express.static('public'));
app.use('/thirdparty', express.static('bower_components'));

app.listen(8080);
console.log("Listening on 8080...");
//# sourceMappingURL=index.js.map
