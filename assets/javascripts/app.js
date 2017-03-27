
// JAVASCRIPTS

// Changes navbar background color when scrolling over info image
$(document).ready(function(){
  var imageHeight = $("#intro").innerHeight();
  console.log(imageHeight)

  // $(document).on("scroll", scrolling(imageHeight, this));
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos > (imageHeight)) {
      $("li > a").css({"color": "#EB6852"});
      $(".navbar-fixed-top").css({"background-color": "white"});
    } else {
      $("li > a").css({"color": "white", "font-weight": "bold"});
      $(".navbar-fixed-top").css({"background-color": "rgba(179, 40, 45, 0.75)"});
    }
  });
});
