const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comments = await Comment.find({Post: req.params.postid}).populate("user").sort().lean()
      // for(const comment in comments){
      //   console.log(comments[comment].createdAt.getDate())
      // }

      // console.log(comments)

      res.render("post.ejs", { post: post, comments : comments ,user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPostComments: async (req, res) => {
    try {
      // const post = await Post.findById(req.params.id);

      const comments = await Comment.find({Post: req.params.id}).populate("user").sort().lean()
      // const commentsJSON =  JSON.stringify(comments)

      // console.log(comments)
      res.json(comments) 
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        type: req.body.type
      });
      const user = await User.findById(req.user.id)
      user.totalScore += 10
      await user.save() 
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try{
      const post  = await Post.findById(req.params.id);
      const user = await User.findById(post.user)
      if(post.likedBy.includes(req.user.id)){
        post.likedBy.remove(req.user.id)
        post.score--;
        user.totalScore--;
      }
      else if(post.dislikedBy.includes(req.user.id)){
        post.dislikedBy.remove(req.user.id)
        post.likedBy.push(req.user.id)
        post.score +=2; 
        user.totalScore +=2 ;

      }
      else{
        post.likedBy.push(req.user.id)
        post.score++;
        user.totalScore++;

      }
      await post.save()
      await user.save()
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    


    } catch (err) {
      console.log(err);
    }
  },
  dislikePost : async (req, res) => {
    console.log("get disliked HAHAHAHA")
    try{
      const post  = await Post.findById(req.params.id);
      if(post.dislikedBy.includes(req.user.id)){
        post.dislikedBy.remove(req.user.id)
        post.score++;
      }
      else if(post.likedBy.includes(req.user.id)){
        post.likedBy.remove(req.user.id)
        post.dislikedBy.push(req.user.id)
        post.score -=2
      }
      else{
        post.dislikedBy.push(req.user.id)
        post.score--
      }
      await post.save()
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    }
    catch(err){
      console.log(err);
    }
    
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      const post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  addRemoveFavorite : async(req, res) =>{
    try{
      const user = await User.findById({ _id: req.user.id });
      console.log("the user is "  + user)
      if(user.faviorities.includes(req.params.postid)){
        user.faviorities.remove(req.params.postid)
      }
      else{
        user.faviorities.push(req.params.postid)
      }
      
      await user.save()
      console.log("added favs");
      res.redirect("/profile");
    }
    catch(err){
      res.redirect("/profile");
      console.log(err)
    }
  }
};
