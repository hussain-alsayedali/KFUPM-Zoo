const Post = require("../models/Post");

module.exports = {
    getFeed: async (req, res) => {
        try {

          console.log(req.query.type)
          const type = req.query.type
          let typeQuery = {type: type}
          if(type == "all")
          typeQuery = {}
          const posts = await Post.find(typeQuery).sort({ createdAt: "desc" }).lean();
          


          res.render("feed.ejs", { posts: posts });
        } catch (err) {
          console.log(err);
        }
      },

}