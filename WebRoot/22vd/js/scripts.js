$(document).ready(function(){

 	"use strict";

 	// Search
 	$('#search .search-trigger').on('click',function(){
        $('.search-bar').animate({height: 'toggle'},500);
    });

    // jQuery to collapse the navbar on scroll
    $(window).scroll(function(){
	    if(window.scrollY > 10){
	        $('nav').addClass("sticky");
	    }else{
	        $('nav').removeClass("sticky");
	    }
	});


 	$(window).load(function() {

 		// Preloader
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	

		// Isotope Filter
		var $container = $('#portfolio-container').isotope();

		// filter items on button click
		$('.portfolio-filter').on( 'click', 'a', function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });

			$('.portfolio-filter a').removeClass('active');
			$(this).closest('a').addClass('active');

		});


		// Flexslider / Masonry
		$('.flexslider').flexslider({
		    animation: "slide",
		    directionNav: false,
		    touch: true,
		    start: function(){
		    	var $container = $('.masonry');
                $container.imagesLoaded( function() {
                	$container.isotope({
                		itemSelector: '.masonry-item',
						layoutMode: 'masonry'
					});
				});
			}
		});

	});


	// Moblie Menu resize
	$(".navbar-fixed-top .navbar-collapse").css("max-height", $(window).height() - $(".navbar-header").height() );
	    

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
	    $('a.page-scroll').bind('click', function(event) {
	        var $anchor = $(this);
	        $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top
	        }, 1500, 'easeInOutExpo');
	        event.preventDefault();
	    });
	});


	// Closes the Responsive Menu on Menu Item Click
	$('.navigation.overlay .navbar-collapse ul li a').on('click',function() {
	    $('.navbar-toggle:visible').click();
	});

	
	// Browser Detect
	$.browserSelector();
	// Adds window smooth scroll on chrome.
	if($("html").hasClass("chrome")) {
		$.smoothScroll();
	}

		
	// Owl Carousel
	var owl = $("#owl-featured-works");
	 
	owl.owlCarousel({
	     
	    itemsCustom: [
	      [0, 1],      
	      [450, 2],
	      [700, 3],
	      [1000, 3],
	      [1200, 4],
	      [1400, 5],
	      [1600, 5]
	    ],

	      pagination: false,
	      navigation: true,
	      navigationText:	["",""]

	})

 
	$("#owl-testimonials").owlCarousel({

	  autoPlay: 6000, //Set AutoPlay to 6 seconds

	  items: 3,
	  itemsDesktop: [1199,3],
	  itemsDesktopSmall: [979,3],
	  stopOnHover: true

	});


	$("#owl-featured-works-one-img").owlCarousel({
 
      navigation: false, // Show next and prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
 
 	});


 	$("#owl-slider-one-img").owlCarousel({
 
      navigation: false,
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
 
 	});



 	var owl = $("#owl-related-works");
 
  	owl.owlCarousel({

      slideSpeed: 300,
      paginationSpeed: 400,
      items: 3,
      itemsDesktop: [1199,3],
	  itemsDesktopSmall: [979,3],
	  pagination: false

  	});

 	// Custom Navigation Events
	$(".next").on('click',function(){
		owl.trigger('owl.next');
	})
	$(".prev").on('click',function(){
		owl.trigger('owl.prev');
	});
	  
 
 
 	// Wow Animations
 	new WOW().init();

	// Counters

	$('.statistic').appear(function() {
		$('.timer').countTo({
			speed: 4000,
			refreshInterval: 60,
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			}
		});
	});



	// Accordion
    var allPanels = $(".accordion > .panel-content").hide();
    allPanels.first().slideDown("easeOutExpo");
    $(".accordion > .acc-panel > a").first().addClass("active");
    
    $(".accordion > .acc-panel > a").on('click',function(){
    
        var current = $(this).parent().next(".panel-content");
        $(".accordion > .acc-panel > a").removeClass("active");
        $(this).addClass("active");
        allPanels.not(current).slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");
        
        return false;
       
    });


    // Pie Charts
    $(function() {
    	$('.chart').appear(function() {

			$('.chart').easyPieChart({

				animate:{
                duration:3000,
                enabled:true
            	},
				scaleColor:false,
				trackColor:'#ecf0f1',
				easing: 'easeOutBounce',
				lineWidth: 7,
				size: 190,
				lineCap: 'square',

				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
			var chart = window.chart = $('.chart').data('easyPieChart');
			$('.js_update').on('click', function() {
				chart.update(Math.random()*200-100);
			});
		});
	});


	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit-message'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],input[type=email],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});


});


// Animated Skills
$(function() {
	
    
    var $section = $('#animated-skills').appear(function() {
    
    function loadDaBars() {
        var bar = $('.progress-bar');
			$(function(){
			  $(bar).each(function(){
			    bar_width = $(this).attr('aria-valuenow');
			    $(this).width(bar_width + '%');
			  });
			});
    }

    	loadDaBars();
    });
    
});



// Scroll to Top

(function() {
	"use strict";

	var docElem = document.documentElement,
		didScroll = false,
		changeHeaderOn = 550;
		document.querySelector( '#back-to-top' );
	function init() {
		window.addEventListener( 'scroll', function() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 50 );
			}
		}, false );
	}
	
})();

$(window).scroll(function(event){
	var scroll = $(window).scrollTop();
if (scroll >= 50) {
    $("#back-to-top").addClass("show");
} else {
    $("#back-to-top").removeClass("show");
}
});

$('a[href="#top"]').on('click',function(){
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
});