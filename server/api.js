
import crypto from 'crypto';

function hash(str) {
  var hasher = crypto.createHmac('sha256', 'ppooopopopo!!');
  return hasher.update(str).digest('hex');
}

export default function(app) {

  function getCurrentUser(req) {
    let User = req.models.User;

    return new Promise((resolve, reject) => {
      if (req.session.userid) {
        User.get(req.session.userid, (err, user) => {
          if (err) { reject(err) } else { resolve(user) };
        })
      } else {
        reject("Not logged in.");
      }
    })

  }

  function promiseMap(arr, fn) {
    var promises = [];
    for (var val of arr) {
      promises.push(new Promise ((resolve, reject) => {
        fn(val, resolve, reject);
      }));
    }

    return Promise.all(promises);
  }

  app.get('/api', (req, res) => {
    res.send({test: 'hi'});
  })

  app.post('/api/create', (req, res) => {
    getCurrentUser(req).then((user) => {
      if (!req.body.title || req.body.title.length == 0 ||
          !req.body.description || req.body.description.length == 0) {
        res.send({success: false});
      } else {
        let Post = req.models.Post

        Post.create({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
          timestamp: (new Date).getTime()
        }, (err, post) => {
          if (err) {
            console.log(err);
            res.send({success: false});
          } else {
            post.setUser(user, (err) => {
              if (err) { res.send({success: false, err: err}) } else { res.send({success: true, id: post._id}) }
            });
          }
        })
      }
    }).catch((e) => {
      res.send({success: false, err: e});
    })
  });

  app.get('/image/:itemId', (req, res) => {
    let Post = req.models.Post;
    Post.get(req.params.itemId, (err, post) => {
      if (err || !post.image) {
        res.send("Error! " + err);
      } else {
        res.set('Content-Type', 'image/png');
        res.end(new Buffer(post.image.split(",")[1], 'base64'), 'binary');
      }
    })
  })

  app.get('/api/item/:itemId', (req, res) => {
    let Post = req.models.Post;
    let Comment = req.models.Comment;

    let ret = {}

    new Promise((resolve, reject) => {

      Post.get(req.params.itemId, (err, post) => {
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
          }
          resolve(post);
        }
      })
    }).then((post) => {
      return new Promise((resolve, reject) => {
        post.getUser((err, user) => {
          ret.user = user || { username: "unavailable" };
          resolve();
        })
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        Comment.find({parent_id: req.params.itemId}, {order: ["-timestamp"]}, (err, comments) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            promiseMap(comments, (comment, resolve, reject) => {
              comment.getUser((err, user) => {
                if (user)
                  comment.user = { username: user.username };
                resolve();
              })
            }).then(() => {
              ret.comments = comments.map((comment) => {
                return {
                  _id: comment._id,
                  content: comment.content,
                  user: comment.user || { username: "unavailable" },
                  hidden: comment.hidden
                }
              })
              resolve();
            });
          }
        });
      })
    }).then(() => {
      res.send(ret);
    }).catch((e) => {
      console.log(e);
      res.send({success: false, err: e.toString()});
    });
  })

  app.get('/api/feed', (req, res) => {
    let Post = req.models.Post;
    Post.find({}, {order: ["-timestamp"]}, (err, posts) => {
      if (err) {
        res.send({
          success: false,
          err: err
        })
      } else {
        promiseMap(posts, (post, resolve, reject) => {
          post.getUser((err, user) => {
            if (user)
              post.user = { username: user.username };
            resolve();
          })
        }).then(() => {
          res.send({
            success: true,
            posts: posts.map((post) => {
              return {
                title: post.title,
                description: post.description,
                price: post.price,
                user: post.user || { username: "unavailable" },
                _id: post._id,
              }
            })
          })
        });
      }
    })
  });

  app.post('/api/comment', (req, res) => {
    if (!req.body.content || req.body.content.length == 0) {
      res.send({success: false});
    } else {

      let Post = req.models.Post;
      let Comment = req.models.Comment;

      let user = null;

      getCurrentUser(req).then((_user) => {
        user = _user;

        return new Promise((resolve, reject) => {
          Post.get(req.body.itemId, (err, post) => {
            resolve(post);
          });
        });
      }).then((post) => {
        return new Promise((resolve, reject) => {
          Comment.create({
            content: req.body.content,
            hidden: req.body.hidden
          }, (err, comment) => {
            if (err) { reject(err) } else {
              comment.setParent(post, (err) => {
                if (err) { reject(err) } else { resolve(comment) }
              });
            }
          })
        });
      }).then((comment) => {
        return new Promise((resolve, reject) => {
          comment.setUser(user, (err) => {
            if (err) { reject(err) } else { resolve(comment) }
          });
        });
      }).then((comment) => {
        res.send({success: true, id: comment._id});
      }).catch((e) => {
        console.log(e);
        res.send({success: false, err: e});
      })
    }
  });

  app.get('/api/comments/:itemId', (req, res) => {

    let Post = req.models.Post;
    let Comment = req.models.Comment;


    Comment.find({parent_id: req.params.itemId}, {order: ["-timestamp"]}, (err, comments) => {
      // console.log(comments);
      if (err) {
        res.send({
          success: false,
          err: err
        });
      } else {
        promiseMap(comments, (comment, resolve, reject) => {
          comment.getUser((err, user) => {
            if (user)
              comment.user = { username: user.username };
            resolve();
          })
        }).then(() => {
          console.log("huh");
          res.send({
            success: true,
            comments: comments.map((comment) => {
              console.log(comment.user);
              return {
                _id: comment._id,
                content: comment.content,
                user: comment.user || { username: "unavailable" },
                hidden: comment.hidden
              }
            })
          });
        }).catch((e) => {
          res.send({
            success: false,
            err: e.toString()
          });
        });

      }
    });
  })

  app.get('/api/current_user', (req, res) => {

    getCurrentUser(req).then((user) => {
      res.send({
        success: true,
        username: user.username
      })
    }).catch((e) => {
      res.send({
        success: false,
        err: e.toString()
      })
    });

  })


  app.post('/api/logout', (req, res) => {
    req.session.userid = null;
    res.send({success: true});
  });

  app.post('/api/login_register', (req, res) => {
    if (!req.body.user || req.body.user.length == 0 ||
        !req.body.password || req.body.password.length == 0) {
      res.send({success: false});
    } else {
      let User = req.models.User

      new Promise((resolve, reject) => {

        User.find({username: req.body.user}, (err, users) => {
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
            }, (err, user) => {
              if (err) { reject(err) } else {
                req.session.userid = user._id;
                resolve()
              }
            });
          }
        });

      }).then(() => {
        res.send({success: true});
      }).catch((e) => {
        res.send({success: false});
      })

    }
  });

}
