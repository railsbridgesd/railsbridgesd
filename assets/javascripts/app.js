
// JAVASCRIPTS

$(document).ready(function(){

  // Update navbar background as we scroll
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

      // $("li > a").css({"color": "#EB6852"});
      // $(".navbar-fixed-top").css({"background-color": "white"});
      // $("li > a").css({"color": "white", "font-weight": "bold"});
      // $(".navbar-fixed-top").css({"background-color": "rgba(179, 40, 45, 0.75)"});
    if (currentPos > 590) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

});
