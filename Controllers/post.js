const Post = require("../models/post");

exports.createPost=(req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,      creator: req.userData.userId

  });
  post.save().then((createdPost) => {
 console.log(createdPost);
    res.status(201).json({
      message: "post saved succesfully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,      creator: req.userData.userId

      },

    });
  }).catch(error=>{

    return res.status(400).json({ message: 'Cant create post' });
  });
};


exports.getPosts=(req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  const queryData = Post.find();
  let fetchedPost;

  if (pageSize && currentPage) {
    queryData.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  queryData
    .then((documents) => {
      fetchedPost = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        posts: fetchedPost,
        postsCount: count,
      });
    }).catch(error=>{

      return res.status(400).json({ message: 'Cant get posts' });});};


      exports.updatePost=(req, res, next) => {
        let imagePath = req.body.imagePath;
        if (req.file) {
          const url = req.protocol + "://" + req.get("host");

          imagePath = url + "/images/" + req.file.filename;
        }
        console.log(req.userData);
        const post = new Post({
          _id: req.body.id,
          title: req.body.title,
          content: req.body.content,
          imagePath: imagePath,    creator:req.userData.userId

        });
        Post.updateOne(
          { _id: req.params.id, creator: req.userData.userId },
          post
        ).then((result) => {
          if (result.n > 0) {
            res.status(200).json({ message: "Updated succefully" });
          } else {
            return res.status(401).json({ message: "not authorize" });
          }
        }).catch(error=>{

          return res.status(400).json({ message: 'Cant create post' });});
      };


      exports.deletePost=(req, res, next) => {
        Post.deleteOne({
          _id: req.params.id,
          creator: req.userData.userId
        }).then((result) => {
          if (result.n > 0) {
            res.status(200).json({ message: "deleted succefully" });
          } else {
            return res.status(401).json({ message: "not authorize" });
          }
        }).catch(error=>{

          return res.status(400).json({ message: 'Cant delete post' });});

      };


      exports.getPost=(req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json("faild to update");
    }
  }).catch(error=>{

     res.status(400).json({ message: 'Cant get post' });});
};
