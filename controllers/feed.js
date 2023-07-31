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
          
          const type = req.query.type
          const oldPage = req.query.page
          const sort = req.query.sort

          let sortType = sort.split("_")[0] 
          let sortWay  = sort.split("_")[1] 

          let sortQuery = {}
          sortQuery[sortType] = sortWay
          console.log(sortQuery)
          let typeQuery = {type: type}
          if(type == "all")
          typeQuery = {}
          // { createdAt: "desc" }
          const posts = await Post.find(typeQuery).sort(sortQuery).skip(oldPage * pagesConstant).limit(pagesConstant).lean();
          const totalPages =  Math.ceil(await Post.countDocuments(typeQuery) / pagesConstant)
          // console.log(res)
          res.render("feed.ejs", { posts: posts, totalPages: totalPages });
        } catch (err) {
          console.log(err);
        }
      },
      getFeedLimitedJson: async(req , res) =>{
        try{
          const pagesConstant = 6
          const type = req.query.type
          const oldPage = req.query.page
          const sort = req.query.sort

          let sortType = sort.split("_")[0] 
          let sortWay  = sort.split("_")[1] 

          let sortQuery = {}
          sortQuery[sortType] = sortWay

          let typeQuery = {type: type}
          if(type == "all")
            typeQuery = {}
          
          const posts = await Post.find(typeQuery).sort(sortQuery).skip(oldPage * pagesConstant).limit(pagesConstant).lean();
          const totalPages =  Math.ceil(await Post.countDocuments(typeQuery) / pagesConstant)
          
          const response = { posts: posts, totalPages: totalPages }
          res.json(response)
        }
        catch(err){
          console.log(err)
        }
      },

}