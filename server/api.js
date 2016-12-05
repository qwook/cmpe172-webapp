
export default function(app) {

  app.get('/api', (req, res) => {
    res.send({test: 'hi'});
  })

  app.post('/api/create', (req, res) => {
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
      }, (err, result) => {
        if (err) {
          console.log(err);
          res.send({success: false});
        } else {
          res.send({success: true, id: result._id});
        }
      })
    }
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
          resolve();
        }
      })

    }).then(() => {
      return new Promise((resolve, reject) => {
        Comment.find({parent_id: req.params.itemId}, {order: ["-timestamp"]}, (err, comments) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            ret.comments = comments.map((comment) => {
              return {
                _id: comment._id,
                content: comment.content,
                user: {
                  _id: "BLANK",
                  username: "BLANK"
                },
                hidden: comment.hidden
              }
            })
            console.log(ret.comments);
            resolve();
          }
        });
      })
    }).then(() => {
      console.log("how");
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
        res.send({
          success: true,
          posts: posts.map((post) => {
            return {
              title: post.title,
              description: post.description,
              price: post.price,
              user: {
                _id: "BLANK",
                username: "BLANK"
              },
              _id: post._id,
            }
          })
        })
      }
    })
  });

  app.post('/api/comment', (req, res) => {
    if (!req.body.content || req.body.content.length == 0) {
      res.send({success: false});
    } else {

      let Post = req.models.Post;
      let Comment = req.models.Comment;

      Post.get(req.body.itemId, (err, post) => {
        Comment.create({
          content: req.body.content,
          hidden: req.body.hidden
        }, (err, comment) => {
          if (err) {
            res.send({success: false, err: err});
          } else {
            comment.setParent(post, (err) => {
              if (err) {
                res.send({success: false, err: err});
              } else {
                res.send({success: true, id: comment._id});
              }
            });
          }
        })
      });
    }
  });

  app.get('/api/comments/:itemId', (req, res) => {

    let Post = req.models.Post;
    let Comment = req.models.Comment;


    Comment.find({parent_id: req.params.itemId}, {order: ["-timestamp"]}, (err, comments) => {
      console.log(comments);
      if (err) {
        res.send({
          success: false,
          err: err
        });
      } else {
        res.send({
          success: true,
          comments: comments.map((comment) => {
            return {
              _id: comment._id,
              content: comment.content,
              user: {
                _id: "BLANK",
                username: "BLANK"
              },
              hidden: comment.hidden
            }
          })
        });
      }
    });
  })

}
