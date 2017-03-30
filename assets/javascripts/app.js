
// JAVASCRIPTS

$(document).ready(function(){

  // Update navbar background as we scroll
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos > 550) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // Scroll to section
  $('.navbar a').click(function() {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 50
      }, 500);
      return false;
    }
  });

  // Post to email
  $('.footer button[type="submit"]').on("click", function(e) {
    e.preventDefault();

    var name = $('[name="name"]').val();
    var email = $('[name="email"]').val();
    var interest = $('[name="interest"]').find(':selected').val();
    var message = $('[name="message"]').val();
    $('.messages > span').hide();

    if (!interest) {
      $('.message-interest').show();
    } else if (!validateEmail(email)) {
      $('.message-email').show();
    } else {
      $.ajax({
        url: '/contact',
        method: 'POST',
        data: {
          name: name,
          email: email,
          interest: interest,
          message: message
        },
        beforeSend: function() {
          $('span.loading').show();
        },
        success: function() {
          $('.messages > span').hide();
          $('.message-success').show();
          $(".footer form").get(0).reset();
        },
        error: function() {
          $('.messages > span').hide();
          $('.message-fail').show();
        }
      });
    }
  });
  
  // Lazy load carousel images 
  $(function() {
      $('.carousel.lazy').bind('slide.bs.carousel', function (e) {
          var images = $(e.relatedTarget).find('img[data-src]');
          images.each(function() {
            $(this).attr('src', $(this).data('src'));
            $(this).removeAttr('data-src');
          });
      });
  });
  
});

// FUNCTIONS

function validateEmail(email) {
  /* Shallow email validation that checks for presence and that only one @
  ** Test Cases:
  ** validateEmail("sadfds@yahoo.com") => true
  ** validateEmail("sdfdssadf") => false
  ** validateEmail("safsd@sdfasd@.com") => false
  ** validateEmail("") => false
  */

  var re = /^[^@]+@[^@]+$/;

  return (re.test(email)) ? true : false;
}
