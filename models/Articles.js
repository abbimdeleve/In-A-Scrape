const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
    // unique: true
  },
  
  articleLink: {
    type: String,
    required: true
  },
  // articleImageLink: {
  //   type: String,
  //   required: true
  // },
 
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
  
});


const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;