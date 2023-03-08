const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try{
          await Comment.create({
            content: req.body.content,
            post : req.params.postid,
            score: 0,
            user: req.user.id,
          });
          console.log("Post has been added!");
          res.redirect("/post/" + req.params.postid );
        } catch (err) {
          console.log(err); 
        }
      },
      
  };