'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {

  function getCurrentUser(req) {
    var User = req.models.User;

    return new Promise(function (resolve, reject) {
      if (req.session.userid) {
        User.get(req.session.userid, function (err, user) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          };
        });
      } else {
        reject("Not logged in.");
      }
    });
  }

  function promiseMap(arr, fn) {
    var promises = [];
    for (var val of arr) {
      promises.push(new Promise(function (resolve, reject) {
        fn(val, resolve, reject);
      }));
    }

    return Promise.all(promises);
  }

  app.get('/api', function (req, res) {
    res.send({ test: 'hi' });
  });

  app.post('/api/create', function (req, res) {
    getCurrentUser(req).then(function (user) {
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
        }, function (err, post) {
          if (err) {
            console.log(err);
            res.send({ success: false });
          } else {
            post.setUser(user, function (err) {
              if (err) {
                res.send({ success: false, err: err });
              } else {
                res.send({ success: true, id: post._id });
              }
            });
          }
        });
      }
    }).catch(function (e) {
      res.send({ success: false, err: e });
    });
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
          resolve(post);
        }
      });
    }).then(function (post) {
      return new Promise(function (resolve, reject) {
        post.getUser(function (err, user) {
          ret.user = user || { username: "unavailable" };
          resolve();
        });
      });
    }).then(function () {
      return new Promise(function (resolve, reject) {
        Comment.find({ parent_id: req.params.itemId }, { order: ["-timestamp"] }, function (err, comments) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            promiseMap(comments, function (comment, resolve, reject) {
              comment.getUser(function (err, user) {
                if (user) comment.user = { username: user.username };
                resolve();
              });
            }).then(function () {
              ret.comments = comments.map(function (comment) {
                return {
                  _id: comment._id,
                  content: comment.content,
                  user: comment.user || { username: "unavailable" },
                  hidden: comment.hidden
                };
              });
              resolve();
            });
          }
        });
      });
    }).then(function () {
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
        promiseMap(posts, function (post, resolve, reject) {
          post.getUser(function (err, user) {
            if (user) post.user = { username: user.username };
            resolve();
          });
        }).then(function () {
          res.send({
            success: true,
            posts: posts.map(function (post) {
              return {
                title: post.title,
                description: post.description,
                price: post.price,
                user: post.user || { username: "unavailable" },
                _id: post._id
              };
            })
          });
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

        var user = null;

        getCurrentUser(req).then(function (_user) {
          user = _user;

          return new Promise(function (resolve, reject) {
            Post.get(req.body.itemId, function (err, post) {
              resolve(post);
            });
          });
        }).then(function (post) {
          return new Promise(function (resolve, reject) {
            Comment.create({
              content: req.body.content,
              hidden: req.body.hidden
            }, function (err, comment) {
              if (err) {
                reject(err);
              } else {
                comment.setParent(post, function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(comment);
                  }
                });
              }
            });
          });
        }).then(function (comment) {
          return new Promise(function (resolve, reject) {
            comment.setUser(user, function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(comment);
              }
            });
          });
        }).then(function (comment) {
          res.send({ success: true, id: comment._id });
        }).catch(function (e) {
          console.log(e);
          res.send({ success: false, err: e });
        });
      })();
    }
  });

  app.get('/api/comments/:itemId', function (req, res) {

    var Post = req.models.Post;
    var Comment = req.models.Comment;

    Comment.find({ parent_id: req.params.itemId }, { order: ["-timestamp"] }, function (err, comments) {
      // console.log(comments);
      if (err) {
        res.send({
          success: false,
          err: err
        });
      } else {
        promiseMap(comments, function (comment, resolve, reject) {
          comment.getUser(function (err, user) {
            if (user) comment.user = { username: user.username };
            resolve();
          });
        }).then(function () {
          console.log("huh");
          res.send({
            success: true,
            comments: comments.map(function (comment) {
              console.log(comment.user);
              return {
                _id: comment._id,
                content: comment.content,
                user: comment.user || { username: "unavailable" },
                hidden: comment.hidden
              };
            })
          });
        }).catch(function (e) {
          res.send({
            success: false,
            err: e.toString()
          });
        });
      }
    });
  });

  app.get('/api/current_user', function (req, res) {

    getCurrentUser(req).then(function (user) {
      res.send({
        success: true,
        username: user.username
      });
    }).catch(function (e) {
      res.send({
        success: false,
        err: e.toString()
      });
    });
  });

  app.post('/api/logout', function (req, res) {
    req.session.userid = null;
    res.send({ success: true });
  });

  app.post('/api/login_register', function (req, res) {
    if (!req.body.user || req.body.user.length == 0 || !req.body.password || req.body.password.length == 0) {
      res.send({ success: false });
    } else {
      (function () {
        var User = req.models.User;

        new Promise(function (resolve, reject) {

          User.find({ username: req.body.user }, function (err, users) {
            var user = users[0];
            if (users.length > 0 && user) {
              if (user.password == hash(req.body.password)) {
                req.session.userid = user._id;
                resolve();
              } else {
                reject();
              }
            } else {
              User.create({
                username: req.body.user,
                password: hash(req.body.password)
              }, function (err, user) {
                if (err) {
                  reject(err);
                } else {
                  req.session.userid = user._id;
                  resolve();
                }
              });
            }
          });
        }).then(function () {
          res.send({ success: true });
        }).catch(function (e) {
          res.send({ success: false });
        });
      })();
    }
  });
};

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hash(str) {
  var hasher = _crypto2.default.createHmac('sha256', 'ppooopopopo!!');
  return hasher.update(str).digest('hex');
}
//# sourceMappingURL=api.js.map
