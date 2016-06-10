;(function($) {
    "use strict";
    
    function donate_box(){
        if ( $('#donate_box').length ){            
            $('a[href="#donate_box"]').magnificPopup({
              type:'inline',
              midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            })
        }
    }
    donate_box();
    
    function countDownActive(){
        if ( $('#upcoming-event-countdown').length ){
             $('#upcoming-event-countdown').countdown('2018/10/05', function(event) { 
                 $(this).html(event.strftime(
                     '<div class="block days"><span class="string">%!D:Day,Days;</span><span class="number">%-D</span></div>'+
                     '<div class="block hours"><span class="string">%!H:Hour,Hours;</span><span class="number">%H</span></div>'+
                     '<div class="block minutes"><span class="string">%!M:Minute,Minutes;</span><span class="number">%M</span></div>'+
                     '<div class="block seconds"><span class="string">%!S:Second,Seconds;</span><span class="number">%S</span></div>'
                ))
            })
        }
    }
    countDownActive();
    
    function uiSlider(){
        if ( $('.slider-range').length ) {
            $( ".slider-range" ).slider({
                range: true,
                min: 0,
                max: 200,
                values: [ 35, 95 ],
                slide: function( event, ui ) {
                    $( ".range-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] )
                }
            });
            $( ".range-amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ) + " - $" + $( ".slider-range" ).slider( "values", 1 ) )
        }
    }
    uiSlider();
    
    function featured_events(){
        if ( $('.featured_events').length ){            
            $('.featured_events').owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots: true,
                items: 1
            })
        }
    }
    featured_events();
    
    function featured_news(){
        if ( $('.featured_news').length ){            
            $('.featured_news').owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots: true,
                items: 1
            })
        }
    }
    featured_news();
    
    function featured_causes(){
        if ( $('.featured_causes').length ){            
            $('.featured_causes').owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                dots: false,
                items: 1
            })
        }
    }
    featured_causes();
    
    function history_carousel(){
        if ( $('.history_carousel').length ){            
            $('.history_carousel').owlCarousel({
                loop: false,
                margin: 0,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                dots: false,
                items: 1
            })
        }
    }
    history_carousel();
    
    function cause_imgs(){
        if ( $('.cause_imgs').length ){
            $('.cause_imgs').each(function(){
                $('.cause_imgs').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: false,
                    dots: true,
                    items: 1
                })
            })            
        }
    }
    cause_imgs();
    
    function post_gallery(){
        if ( $('.post-gallery').length ){
            $('.post-gallery').each(function(){
                $('.post-gallery').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: true,
                    navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
                    dots: false,
                    items: 1
                })
            })            
        }
    }
    post_gallery();
    
    function causes_carousel(){
        if ( $('.causes_carousel').length ){            
            $('.causes_carousel').owlCarousel({
                loop: false,
                margin: 0,
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    700: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            })
        }
    }
    causes_carousel();
    
    function recent_product_carosel(){
        if ( $('.recent_product_carosel').length ){            
            $('.recent_product_carosel').owlCarousel({
                loop: false,
                margin: 0,
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    700: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            })
        }
    }
    recent_product_carosel();
    
    function counterUpActivator(){
        if ( $('.counter').length ){
            $('.counter').counterUp()
        }
    }
    counterUpActivator();
    
    function progressBarActivator() {
        if ( $('.progress').length ){
            $(".progress").each(function() {
                $(this).waypoint(function() {
                    var progressBar = $(".progress-bar");
                    progressBar.each(function(indx){
                        $(this).css("width", $(this).attr("aria-valuenow") + "%");
                    })
                }, {
                    triggerOnce: true,
                    offset: 'bottom-in-view'
                })
            })
        }
    }
    progressBarActivator();
    
    function circleProgressBarActivator() {
        if ( $('.progress_circular').length ){
            $(".progress_circular").each(function() {
                $(this).waypoint(function() {
                    var progressBar = $(".progress-bar");
                    progressBar.each(function(indx){
                        $(this).css("height", $(this).attr("aria-valuenow") + "%");
                    })
                }, {
                    triggerOnce: false,
                    offset: 'bottom-in-view'
                })
            })
        }
    }
    circleProgressBarActivator();
    
    function mapBox() {
        if ( $('#mapBox').length ){
            var $lat = $('#mapBox').data('lat');
            var $lon = $('#mapBox').data('lon');
            var $zoom = $('#mapBox').data('zoom');
            var $marker = $('#mapBox').data('marker');
            var map = new GMaps({
                el: '#mapBox',
                lat: $lat,
                lng: $lon,
                scrollwheel: false,
                scaleControl: true,
                streetViewControl: false,
                panControl: true,
                disableDoubleClickZoom: true,
                mapTypeControl: false,
                zoom: $zoom
            });
        
            map.addMarker({
                lat: $lat,
                lng: $lon,
                icon: $marker
            })              
        }
    }
    mapBox();
    
    function navbarAffix(){
        if ( $('.navbar').length ){
            var affixTop =  $('.navbar').offset().top;
            $('.navbar').affix({
                offset: {
                    top: affixTop
                }
            })
        }
    }
    navbarAffix();
    
    function sideNav(){
        if ( $('.sideNav').length ){
            $('.sideNav').affix({
                offset: {
                    top: 550,
                    bottom: function () {
                        return (this.bottom = $('footer').outerHeight(!0) + 250)
                    }
                }
            })
        }
    }
    sideNav();
    
    function countDownClock(){
        if ( $('.clock').length ){
            var clock;

            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
                callbacks: {
                    stop: function() {
                      $('.message').html('The clock has stopped!')
                    }
                }
            });

            clock.setTime(691200);
            clock.setCountdown(true);
            clock.start()
        }
    }
    countDownClock();
    
    /*Smooth Scroll*/
    function smoothScroll4sideNav () {
        if ($('.sideNav').length ) {
            $('.sideNav ul li a[href*="#"]').on('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    if ( $(window).width() < 768 ){
                        offset_top4scroll = 50
                    }
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 70
                        }, 1000);
                        return false
                    }
                }
                return false
            })
        }
    }
    smoothScroll4sideNav();
    
    
    /*Scroll Spy*/
    function scrollSpy4sideNav () {
        if ($('.sideNav').length ) {
            $('body').scrollspy({ 
                target: '.sideNav', 
                offset: 70
            })
        }
    }
    scrollSpy4sideNav();
    
    function galleryItems(){
        if ( $('.gallery_container').length ){
            $('.gallery_container').imagesLoaded( function() {
                
                $(".gallery_container").isotope({
                    itemSelector: ".gallery-item",
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });

                // Add isotope click function
                $(".gallery-filter li").on('click',function(){
                    $(".gallery-filter li").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    $(".gallery_container").isotope({
                        filter: selector
                    })
                })
                
            })
        }
    }    
    galleryItems();
    
    function eventListing(){
        if ( $('.event-listing-row').length ){
            $('.event-listing-row').imagesLoaded( function() {
                
                $(".event-listing-row").isotope({
                    itemSelector: ".event-listing",
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.event-sizer'
                    }
                })
                
            })
        }
    }    
    eventListing();
    
    function productListing(){
        if ( $('.product-column').length ){
            $('.product-column').imagesLoaded( function() {
                
                $(".product-column").isotope({
                    itemSelector: ".product",
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.product-sizer'
                    }
                })
                
            })
        }
    }    
    productListing();
    
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
                    })
                })
                
            })
        }
    }    
    causesListing();
    
    function popupGallery(){
        if ($('.popup-gallery').length) {
            $('.popup-gallery').each(function(){
                $('.popup-gallery').magnificPopup({
                    delegate: 'a.popup',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return '<a href="'+ item.el.attr('data-source') +'">'+ item.el.attr('data-title') +'</a>';
                        }
                    }
                });
            })
        }
    }
    popupGallery();
    
    function gallery_featured_carousel(){
        if ( $('.featured-content').length ){
            $('.featured-content').each(function(){
                $(this).owlCarousel({
                    items: 1,
                    loop: true,
                    margin: 0,
                    nav: false,
                    dots: true
                })
            })
        }
    }
    gallery_featured_carousel();
    
    
    $(document).ready(function(){
        
        
    });
    
    $(window).load(function(){
        
        
        
        
    })
    
})(jQuery)