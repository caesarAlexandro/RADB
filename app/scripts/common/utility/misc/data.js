 /**
  * @ComponentName: Javascript Data fuctions
  * @Description: The purposefor this JS functions is to load the proper responsive images into the webpages.
  **/

 define([
    'jquery',
    'underscore',
    'backbone',
    'waypoint'
], function ($, _, Backbone) {
    var waypoints;
    var self = this;
    return {
        fullBg: function (selector) {
            $(selector).each(function () {
                var container = $(this),
                    imgCover = container.data('cover'),
                    imgCoverAlt = container.data('cover-alt'),
                    vidCover = container.data('cover-video'),
                    sizeCover = container.data('cover-size'),
                    imgSr, vidSr, dotPosition;
                if (sizeCover) {
                    dotPosition = imgCover.lastIndexOf('\.');
                    imgCover = imgCover.slice(0, dotPosition) + '-' + sizeCover + imgCover.slice(dotPosition);
                }
                container.addClass('coverImage');
                imgSr = $('<img/>').attr({
                    'src': imgCover,
                    'alt': imgCoverAlt
                }).addClass('sr-only').appendTo(container);
                if (vidCover) {
                    vidSr = $('<video/>').attr({
                            'autoplay': true,
                            'loop': true,
                            'poster': imgCover
                        })
                        .append(
                            $('<source/>').attr({
                                'src': vidCover,
                                'type': 'video/mp4'
                            })
                        )
                        .addClass('coverVideo')
                        .appendTo(container);
                } else {
                    container.css('background-image', 'url(\'' + imgCover + '\')');
                }
                if (imgSr.closest('[itemscope]')) {
                    imgSr.attr('itemprop', 'photo');
                }
            });
        },
        animatedScroll: function (selector) {
            $(selector).each(function () {
                var button = $(this),
                    scrollAnchor = button.data('scroll');
                button.on('click', function () {
                    event.preventDefault();
                    var body = $('html, body');
                    var position = $(scrollAnchor).offset().top;
                    var headerPosition = $('#menu').outerHeight() + $('#book-header').outerHeight();
                    body.stop().animate({scrollTop:  position - headerPosition - 15}, '500', 'swing', function () {});
                });
            });
        },
        listingSort: function (selector, collection, type, parent) {
            var dataJS = this;
            $(selector, parent).on('click', function () {
                var status;
                switch (type) {
                    case 'distance':
                        status = collection.changeComparatorToMiles();
                        break;
                    case 'price':
                        status = collection.changeComparatorToPrice();
                        break;
                    case 'rating':
                        status = collection.changeComparatorToRating();
                        break;
                }
                collection.sort();
                dataJS.fullBg('[data-cover]');
                $('.btn', parent).removeClass('active').removeClass('reverse');
                $(selector, parent).addClass(status);
            });
        },
        waypointNav: function () {
            waypoints = new Waypoint({
                element: document.getElementById('promotions-carousel'),
                handler: function (direction) {
                    if (direction === 'down') {
                        $('#menu').addClass('navbar-inverse');
                        $('.search-pane').addClass('search-inverse');
                    } else {
                        $('#menu').removeClass('navbar-inverse');
                        $('.search-pane').removeClass('search-inverse');
                    }
                },
                offset: '30%'
            });
        },
        disabledWaypointNav: function () {
            if (waypoints) {
                waypoints.disable();
            }
        },
        enableWaypointNav: function () {
            if (waypoints) {
                waypoints.enable();
            }
        },
        themeSwitch: function (themeName) {
            $body = $('html');
            var el = $body[0];
            if (themeName) {
                var prefix = 'theme';
                var classes = $body.attr('class')
                if (classes) {
                    classes = classes.split(' ');
                    var classNames = [];
                    for (var i = 0; i < classes.length; i++) {
                        var matches = classes[i].match(/^theme\-(.+)/);
                        if (matches != null) {
                            classNames.push(matches[0]);
                        }
                    }
                    if (classNames[0] !== ('theme-' + themeName)) {
                        $body.addClass('theme-' + themeName);
                    }
                } else {
                    $body.addClass('theme-' + themeName);
                }
            } else {
                $body.removeClass('theme-radissonRed');
            }
        },
        renderCarousel : function () {
            console.log('asdas');
            $('#owl-demo').owlCarousel({
                  navigation : false,
                  slideSpeed : 300,
                  paginationSpeed : 400,
                  singleItem:true
              });
        },
        pageSwitch: function (pageName) {
            $body = $('body');
            var el = $body[0];
            var prefix = 'page';
            var classes = $body.attr('class')
            if (classes) {
                classes = classes.split(' ');
                var classNames = [];
                for (var i = 0; i < classes.length; i++) {
                    var matches = classes[i].match(/^page\-(.+)/);
                    if (matches != null) {
                        classNames.push(matches[0]);
                    }
                }
                if (classNames[0] !== ('page-' + pageName)) {
                    $body.removeClass(classNames[0]);
                    if (pageName) {
                        $body.addClass('page-' + pageName);
                    }
                }
            } else {
                $body.addClass('page-' + pageName);
            }
        }
    }
});
