
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

      for (let key in req.body) {
        console.log(key);
      }
      // console.log(req.body);
      // console.log(req.body.image);

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
    Post.get(req.params.itemId, (err, post) => {
      if (err || !post.title || !post.image) {
        res.send({success: false, err: err});
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
        })
      }
    })
  })

  app.get('/api/feed', (req, res) => {
    let Post = req.models.Post;
    Post.find({}, {order: ["-timestamp"]}, (err, posts) => {
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
    })
  });

}
