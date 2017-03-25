
// JAVASCRIPTS

// Changes navbar background color when scrolling over info image
$(document).ready(function(){
  var imageHeight = $("#intro").height();

  // $(document).on("scroll", scrolling(imageHeight, this));
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos < (imageHeight + 50)) {
      $(".navbar-fixed-top").css({"background-color": "white"});
    } else {
      $(".navbar-fixed-top").css({"background-color": "transparent"});
    }
  });
});
