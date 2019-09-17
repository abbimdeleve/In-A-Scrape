const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/abbiisgreat", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
 
  axios.get("https://www.chicagotribune.com/politics").then(function(response) {
   
    const $ = cheerio.load(response.data);

    $("div.col-desktop-6 div.crd--cnt").each(function(i, element) {
      
      const result = {};

      result.title = $(this).find("h5").text();
      if (result.title){
        result.articleLink = `http://chicagotribune.com/politics${$(this).find("a").attr("href")}`;
      }
      console.log(result)
     
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    res.send("Scrapified");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find().then( function (dbArticle, err) {
    if(err) return console.log(err);
    res.json(dbArticle);
    // console.log(dbArticle);
  })
});

//wanted to use this route to show all the comments on each article
app.get("/articles/:id", function(req, res) {

  db.Article.findById(req.params.id).populate("Post").then(function(dbArticle, err) {
    if(err) return console.log(err);
    res.json(dbArticle)
  })
  // if doesn't work, check if "Post" needs to be lowercase
});


app.post("/articles/:id", function(req, res) {
 console.log("hey", req.body)
  db.Post.create(req.body).then(function(dbPost) {
    console.log("hello")
    return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {post: dbPost._id}}, {new: true}).then(function(dbArticle, err) {
      if(err) return console.log(err);
      res.json(dbArticle);
  })
  
  })
 
});


app.listen(PORT, "0.0.0.0", function() {
  console.log("App on localhost:" + PORT);
});
