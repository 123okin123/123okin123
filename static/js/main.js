(function($) {
  'use strict';

  /* global variables */
  var portfolioKeyword = '';
  var porftolioSingleActive = false;
  var porftolioSingleJustClosed = false;
  var wind, windReverse, tick;

  /* DOCUMENT LOAD */
  $(function() {
    // ------------------------------

    // SET BG IMAGES
    if ($('.header-wrap > img').length) {
      $('.header').css(
        'background-image',
        'url(' + $('.header-wrap > img').attr('src') + ')'
      );
    }

    // ------------------------------
    // ONE PAGE LAYOUT FUNCTIONS
    if ($('html').hasClass('one-page-layout')) {
      // SET BG IMAGES
      var bigImageUrl = $('.cover-media').data('image-url');
      if (bigImageUrl !== undefined) {
        var bigImage = new Image();
        bigImage.src = bigImageUrl;
        bigImage.onload = function() {
          $('html').addClass('is-card-loaded');
          $('.cover-media')
            .css('background-image', 'url(' + bigImageUrl + ')')
            .addClass('is-image-loaded');
        };
      }

      // MOBILE HEIGHT FIX
      if (isMobile()) {
        $('.one-page-layout .cover-media').height($(window).height());
        $(window).on('resize', function() {
          $('.one-page-layout .cover-media').height($(window).height());
        });
      }

      // show card
      $('#card-open, .cover-link').on('click', function(event) {
        event.preventDefault();
        showCard();
      });
      // close card
      $('.close-card').on('click', function() {
        $('html').removeClass('is-card-open is-card-opened');
        $('.close-card').removeClass('is-visible');


        closePage();
        return false;
      });

      // add hash to links
      $('.card-nav li').each(function(index, element) {
        var menu_link = $(this).find('a');
        var file_url = menu_link.attr('href');
        var slug = menu_link.data('slug');

        menu_link.attr('href', '#/' + slug);
        menu_link.data('file-url', file_url);
      });
    }
    // ------------------------------

    // ------------------------------
    // HEADER FUNCTIONS
    $('.search-toggle').on('click', function() {
      $('html').toggleClass('is-search-toggled-on');
      $('.header-search input').trigger('focus');
    });
    // ------------------------------

    // ------------------------------
    // remove click delay on touch devices
    // FastClick.attach(document.body);
    // ------------------------------

    // ------------------------------
    // BACK TO TOP
    $("a[href='#card']").on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
      return false;
    });
    // ------------------------------

    // ------------------------------
    // DETECT TOUCH DEVICE
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    if (isTouch) {
      $('html').addClass('touch');
    } else {
      $('html').addClass('no-touch');
    }
    // ------------------------------

    // ------------------------------
    // Remove no-js class
    $('html').removeClass('no-js');
    // Remove no-js class
    $('html').addClass('ready');
	// ------------------------------
	

	$('#portfolio').magnificPopup({
		delegate: 'a',
		type: 'inline',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
		  beforeOpen: function() {
			 this.st.mainClass = this.st.el.attr('data-effect');
		  }
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	  });




  });
  // DOCUMENT READY

  // ------------------------------
  // MOBILE CHECK
  function isMobile() {
    return $(window).width() < 992;
  }
  // ------------------------------

  // ------------------------------
  // SHOW CARD
  function showCard() {
    var mq = window
      .getComputedStyle(document.querySelector('.card-intro'), '::before')
      .getPropertyValue('content')
      .replace(/"/g, '')
      .replace(/'/g, '');
    if (mq === 'mobile') {
      $('body,html').animate({ scrollTop: $('#card').offset().top }, 200);
    } else {
      if (!$('html').hasClass('is-card-open')) {
        $('html').addClass('is-card-open');
        $('.card-layout').one(
          'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
          function() {
            $('.close-card').addClass('is-visible');
            $('html').addClass('is-card-opened');
          }
        );
      }
    }
  }
  // ------------------------------

  // ------------------------------
  // CLOSE PAGE
  function closePage() {
    $('html').removeClass('is-ajax-page-loaded is-ajax-page-active');
  }
  // ------------------------------
})(jQuery);
