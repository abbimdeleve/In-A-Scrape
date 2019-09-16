$.getJSON("/articles", function(data) {
    console.log("I'm here")
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(`<p data-id=' ${data[i]._id}'>${data[i].title}</p>
      <a href=${data[i].articleLink}>Link</>`);
    }
  });