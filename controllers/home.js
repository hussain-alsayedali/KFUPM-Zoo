const User = require("../models/User")

module.exports = {
  getIndex: (req, res) => {
    res.render("index");
  },
  getCreatePostPage: (req,res) =>{
    res.render("createPost.ejs");
  },
  getHallOfFame: async (req,res) =>{
    try{
      const users = await User.find().sort({totalScore: -1 }).lean()
      res.render("hallOfFame.ejs", { users: users });
    }
    catch(e){
      console.log(e)
    }

  }

};
