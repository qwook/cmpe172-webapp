'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {

  app.get('/api', function (req, res) {
    res.send({ test: 'hi' });
  });

  app.post('/api/create', function (req, res) {
    if (!req.body.title || req.body.title.length == 0 || !req.body.description || req.body.description.length == 0) {
      res.send({ success: false });
    } else {
      var Post = req.models.Post;

      for (var key in req.body) {
        console.log(key);
      }
      // console.log(req.body);
      // console.log(req.body.image);

      Post.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        timestamp: new Date().getTime()
      }, function (err, result) {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          res.send({ success: true, id: result._id });
        }
      });
    }
  });

  app.get('/image/:itemId', function (req, res) {
    var Post = req.models.Post;
    Post.get(req.params.itemId, function (err, post) {
      if (err || !post.image) {
        res.send("Error! " + err);
      } else {
        res.set('Content-Type', 'image/png');
        res.end(new Buffer(post.image.split(",")[1], 'base64'), 'binary');
      }
    });
  });

  app.get('/api/item/:itemId', function (req, res) {
    var Post = req.models.Post;
    Post.get(req.params.itemId, function (err, post) {
      if (err || !post.title || !post.image) {
        res.send({ success: false, err: err });
      } else {
        console.log(post.price);
        res.send({
          success: true,
          title: post.title,
          description: post.description,
          price: post.price,
          user: {
            _id: "BLANK",
            username: "BLANK"
          },
          _id: post._id,
          comments: []
        });
      }
    });
  });

  app.get('/api/feed', function (req, res) {
    var Post = req.models.Post;
    Post.find({}, { order: ["-timestamp"] }, function (err, posts) {
      res.send({
        success: true,
        posts: posts.map(function (post) {
          return {
            title: post.title,
            description: post.description,
            price: post.price,
            user: {
              _id: "BLANK",
              username: "BLANK"
            },
            _id: post._id
          };
        })
      });
    });
  });
};
//# sourceMappingURL=api.js.map
