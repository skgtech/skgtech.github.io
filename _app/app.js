/*
 * SKGTech
 * Thessaloniki Tech Community
 * https://github.com/skgtech/skgtech.github.io
 *
 * Copyright ©2015 SKGTech Contributors.
 * Licensed under the MIT license.
 */
/**
 * @fileOverview Frontend application bootstrap file
 */

var Calendar = require('./calendar');
var Slack = require('./slack');
//require('./newsletter');

var calendar = new Calendar();
calendar.init();

var slack = new Slack();
slack.init({
  emailField: '.slack-email',
  cta: '.slack-submit',
  form: '.slack-form'
});

;(function($) {
    "use strict";

    // Sticky navbar
    function navbarAffix(){
        if ( $('.navbar').length ){
            var affixTop =  $('.navbar').offset().top;
            $('.navbar').affix({
                offset: {
                    top: affixTop
                }
            });
        }
    }
    navbarAffix();

    // Hero carousel on /index.html
    function featured_news(){
        if ( $('.featured_news').length ){
            $('.featured_news').owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots: true,
                items: 1
            });
        }
    }
    featured_news();

    // Community listing layout on index.html
    function eventListing(){
        if ( $('.communities_row').length ){
            $('.communities_row').imagesLoaded( function() {

                $(".communities_row").isotope({
                    itemSelector: ".community-listing",
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.community-sizer'
                    }
                });

            });
        }
    }
    eventListing();

    // Filtering for startups
    function causesListing(){
        if ( $('.causes_container').length ){
            $('.causes_container').imagesLoaded( function() {

                $(".causes_container").isotope({
                    itemSelector: ".cause-item",
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });

                // Add isotope click function
                $(".causes-filter li").on('click',function(){
                    $(".causes-filter li").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    $(".causes_container").isotope({
                        filter: selector
                    });
                });

            });
        }
    }
    causesListing();

    // SKGTech history carousel on /about.html
    function history_carousel(){
        if ( $('.history_carousel').length ){
            $('.history_carousel').owlCarousel({
                loop: false,
                margin: 0,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                dots: false,
                items: 1
            });
        }
    }
    history_carousel();

})(jQuery);
