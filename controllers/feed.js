const Post = require("../models/Post");

module.exports = {
    getFeed: async (req, res) => {
        try {

         
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
      getFeedLimited: async (req, res) => {
        try {
          const pagesConstant = 6
          console.log(req.query.type)
          const type = req.query.type
          const oldPage = req.query.page
          let typeQuery = {type: type}
          if(type == "all")
          typeQuery = {}
          const posts = await Post.find(typeQuery).sort({ createdAt: "desc" }).skip(oldPage * pagesConstant).limit(pagesConstant).lean();
          const totalPages =  Math.ceil(await Post.countDocuments(typeQuery) / pagesConstant)

          res.render("feed.ejs", { posts: posts, totalPages: totalPages });
        } catch (err) {
          console.log(err);
        }
      },

}