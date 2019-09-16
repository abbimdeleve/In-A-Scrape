$(document).ready(function() {
    $.getJSON("/articles", function(data) {
    console.log("I'm here")
    for (let i = 0; i < data.length; i++) {
      const articles = $("<div class='col-md-4' id='arts'>") 
      articles.append(`<p data-id=' ${data[i]._id}'> 
      ${data[i].title}  <a href=${data[i].articleLink}>Link</></p>`);
      $("#newsFeed").append(articles)
    }
  });
  $("#newsFeed").on("click", "#arts", function () {
      const id = $(this).children("p").attr("data-id");
      console.log(id)
      $('#myModal').modal('show')
  })
  $("#submit").on("click", "#form", function () {
      
  })
});

//${data[i].articleImageLink} add if u figure out image scrape