
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
  $('.navbar a, #sponsors a').click(function() {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 50
      }, 500);
      return false;
    }
  });

  // Post to mailing list
  $('.mailing-list button[type="submit"]').on('click', function(e) {
    e.preventDefault();

    var email = $('#subscribe_email').val();
    $('.mailing-list .messages > span').hide();

    if (!validateEmail(email)) {
      $('.mailing-list .messages .message-email').show();
    } else {
      $.ajax({
        url: '/subscribe',
        method: 'POST',
        data: {email: email},
        beforeSend: function() {
          $('.mailing-list span.loading').show();
        },
        success: function() {
          $('.mailing-list .messages > span').hide();
          $('.mailing-list .messages .message-success').show();
          $('.mailing-list form').get(0).reset();
        },
        error: function() {
          $('.mailing-list .messages > span').hide();
          $('.mailing-list .message-fail').show();
        }
      });
    }
  });

  // Post to email
  $('.footer button[type="submit"]').on('click', function(e) {
    e.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var interest = $('#interest').find(':selected').val();
    var message = $('#message').val();
    $('.footer .messages > span').hide();

    if (!interest) {
      $('.message-interest').show();
    } else if (!validateEmail(email)) {
      $('.footer .messages .message-email').show();
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
          $('.footer span.loading').show();
        },
        success: function() {
          $('.footer .messages > span').hide();
          $('.footer .message-success').show();
          $(".footer form").get(0).reset();
        },
        error: function() {
          $('.footer .messages > span').hide();
          $('.footer .message-fail').show();
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
