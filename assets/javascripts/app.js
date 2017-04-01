
// JAVASCRIPTS

$(document).ready(function(){

  // Update navbar background as we scroll
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos > 525) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // Scroll to section
  $('.navbar a, #sponsors a#contact_us_link, #volunteer a').click(function() {
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

  // Set carousel interval
  $('.carousel').carousel({
    interval: 4000
  });

  // Resize #header height on document load
  window.setTimeout(resizeHeader, 1000);
  
  // Resize #header height when window is resized
  $(window).resize(function() { 
    resizeHeader();
  });

});


// FUNCTIONS

function resizeHeader() {
  // Resize #header height to match responsive #header image height

  // Header images are responsive, so they shrink as the viewport width shrinks.
  // However, we need to make sure that the #header height also shrinks to match.
  // Otherwise, there will be unwanted whitespace between the bottom of the #header image
  // and the #intro content.
  
  // Also, we want to avoid 'flash of unstyled content' behavior with the header image
  // (because it can push other site content down as it fully loads).
  
  // To prevent this, we can hard-code values for min and max height on the #header.
  // But, when we hard-code the values, but it looks bad when the viewport width shrinks,
  // and the header image scales down responsively.
  
  // But, since this only works at certain viewport widths, so we want to dynamically
  // set the min and max height to match the current height of our responsive
  // header image whenever the page is resized.

  // Grab height of first header image
  var header_image_height = $("#header .item").first().height();
  
  // Set #header min and max height if #header image is smaller than 550 pixels high
  if (header_image_height < 550) {
    $('#header').css('min-height', header_image_height);
    $('#header').css('max-height', header_image_height);
    $('.carousel').css('height', header_image_height);
  }
}

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
