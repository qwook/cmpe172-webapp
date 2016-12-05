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
    var Comment = req.models.Comment;

    var ret = {};

    new Promise(function (resolve, reject) {

      Post.get(req.params.itemId, function (err, post) {
        if (err || !post.title || !post.image) {
          reject(err);
        } else {
          ret = {
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
          };
          resolve();
        }
      });
    }).then(function () {
      return new Promise(function (resolve, reject) {
        Comment.find({ parent_id: req.params.itemId }, { order: ["-timestamp"] }, function (err, comments) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            ret.comments = comments.map(function (comment) {
              return {
                _id: comment._id,
                content: comment.content,
                user: {
                  _id: "BLANK",
                  username: "BLANK"
                },
                hidden: comment.hidden
              };
            });
            console.log(ret.comments);
            resolve();
          }
        });
      });
    }).then(function () {
      console.log("how");
      res.send(ret);
    }).catch(function (e) {
      console.log(e);
      res.send({ success: false, err: e.toString() });
    });
  });

  app.get('/api/feed', function (req, res) {
    var Post = req.models.Post;
    Post.find({}, { order: ["-timestamp"] }, function (err, posts) {
      if (err) {
        res.send({
          success: false,
          err: err
        });
      } else {
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
      }
    });
  });

  app.post('/api/comment', function (req, res) {
    if (!req.body.content || req.body.content.length == 0) {
      res.send({ success: false });
    } else {
      (function () {

        var Post = req.models.Post;
        var Comment = req.models.Comment;

        Post.get(req.body.itemId, function (err, post) {
          Comment.create({
            content: req.body.content,
            hidden: req.body.hidden
          }, function (err, comment) {
            if (err) {
              res.send({ success: false, err: err });
            } else {
              comment.setParent(post, function (err) {
                if (err) {
                  res.send({ success: false, err: err });
                } else {
                  res.send({ success: true, id: comment._id });
                }
              });
            }
          });
        });
      })();
    }
  });

  app.get('/api/comments/:itemId', function (req, res) {

    var Post = req.models.Post;
    var Comment = req.models.Comment;

    Comment.find({ parent_id: req.params.itemId }, { order: ["-timestamp"] }, function (err, comments) {
      console.log(comments);
      if (err) {
        res.send({
          success: false,
          err: err
        });
      } else {
        res.send({
          success: true,
          comments: comments.map(function (comment) {
            return {
              _id: comment._id,
              content: comment.content,
              user: {
                _id: "BLANK",
                username: "BLANK"
              },
              hidden: comment.hidden
            };
          })
        });
      }
    });
  });
};
//# sourceMappingURL=api.js.map
