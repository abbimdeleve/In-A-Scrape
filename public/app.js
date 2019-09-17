$(document).ready(function() {
    $.getJSON("/articles", function(data) {
    console.log("I'm here")
    for (let i = 0; i < data.length; i++) {
      const articles = $("<div class='col-md-4' id='arts'>") 
      articles.append(`<p data-id='${data[i]._id}'> 
      ${data[i].title}  <a href=${data[i].articleLink}>Link</>
      </p>`);
      $("#newsFeed").append(articles)
    }
  });

  $("#newsFeed").on("click", "#arts", function () {
      const id = $(this).children("p").attr("data-id");
      console.log(id)
      const idVar = $("#submit")
      idVar.attr("data-id", id)
      $('#myModal').modal('show')
      
  })

  $("#submit").on("click", createPost);

  function createPost (event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    const nameInput = $("#name").val().trim();
    const bodyInput = $("#body").val().trim();
   
    submitPost({name: nameInput, body: bodyInput}, id);
    $("#myModal").modal("toggle")
  }
  
  function submitPost(input, idVar2) {
   console.log(input)
    $.post("/articles/" + idVar2, input)
      .then( function(res) {
        console.log(res)
        $("#name").val("");
        $("#body").val("");
        alert("Thanks for commenting!")
        
    })
  }

  
});

//${data[i].articleImageLink} add if u figure out image scrape