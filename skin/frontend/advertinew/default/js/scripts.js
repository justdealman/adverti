(function($) {//модуль добавления события windowResizeX
    function setWindowResizeXEvent() {
        var newWidth = $(window).width();
        var oldWidth = setWindowResizeXEvent.oldWidth;
        if ( oldWidth != newWidth && setWindowResizeXEvent.oldWidth ) {
            $(window).trigger('windowResizeX');
        }
        setWindowResizeXEvent.oldWidth = $(window).width();
    }
    $(window).resize(function() {
        setWindowResizeXEvent();
    });
})(jQuery);

(function( $ ) {

    function checkSizeOnMicro() {
        if (jQuery(window).width() < 331) {
            jQuery('.js-nav-n').addClass('micro');
            jQuery('.search').addClass('micro');
        } else {
            jQuery('.js-nav-n').removeClass('micro');
            jQuery('.search').removeClass('micro');
        }
    }

    function init_cat_label(){
        var wWidth = jQuery(window).width();
        if ((wWidth <= 640 && wWidth >= 450) || (wWidth < 390)) {
            jQuery('.js-nav-n .nav-n__list__images__text').text('Каталог');
            jQuery('.js-nav-n .nav-n__list__item__link').css('width', '120px');
        }else{
            jQuery('.js-nav-n .nav-n__list__images__text').text('Каталог сувениров');
            jQuery('.js-nav-n .nav-n__list__item__link').css('width', '');
        }
    }

    function init_mini_search_form() {
        if (jQuery(window).width() <= 450) {
            jQuery('#search_mini_form button.search__inner__button').on('click', function (event) {
                if (jQuery('#search_mini_form .search__inner__text').is(":hidden")) {
                    event.preventDefault();
                }
                jQuery('.js-nav-n').addClass('mini');
                jQuery('.search').addClass('mini');
                jQuery('#search_mini_form .search__inner__text').focus();
            });
        }
    }

    $(function() {
        checkSizeOnMicro();
        init_cat_label();
        init_mini_search_form();
        $(window).on('windowResizeX', function() {
            checkSizeOnMicro();
            init_cat_label();
            init_mini_search_form();
            jQuery('.js-nav-n').removeClass('mini');
            jQuery('.search').removeClass('mini');
        });
    });


    $(function() {
        //change classes on resize begins
        $('.js-container').responsive();

        var body = $('body');
        body.on('changeSize1', function() {
            $(this)
                .addClass('set-width-1')
                .removeClass('set-width-2')
                .removeClass('set-width-3')
                .removeClass('set-width-4')
                .removeClass('set-width-5');

//            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//            $('.footer').html('1' + ' ' + width);
        });

        body.on('changeSize2', function() {
            $(this)
                .addClass('set-width-2')
                .removeClass('set-width-1')
                .removeClass('set-width-3')
                .removeClass('set-width-4')
                .removeClass('set-width-5');

//            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//            $('.footer').html('2' + ' ' + width);
          });

        body.on('changeSize3', function() {
            $(this)
                .addClass('set-width-3')
                .removeClass('set-width-1')
                .removeClass('set-width-2')
                .removeClass('set-width-4')
                .removeClass('set-width-5');

//            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//            $('.footer').html('3' + ' ' + width);
        });

        body.on('changeSize4', function() {
            $(this)
                .addClass('set-width-4')
                .removeClass('set-width-1')
                .removeClass('set-width-2')
                .removeClass('set-width-3')
                .removeClass('set-width-5');

//            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//            $('.footer').html('4' + ' ' + width);
        });

        body.on('changeSize5', function() {
            $(this)
                .addClass('set-width-5')
                .removeClass('set-width-1')
                .removeClass('set-width-2')
                .removeClass('set-width-3')
                .removeClass('set-width-4');

//            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//            $('.footer').html('4' + ' ' + width);
        });
        //change classes on resize ends
    });

    $(function() {
        //set class for touch and no touch devices begins
        var body = $('body');
        var setClassIfTouchDevice = function() {
            'ontouchstart' in window
                ? body.addClass('is-touch-device')
                : body.addClass('is-no-touch-device');
        };
        setClassIfTouchDevice();
        //set class for touch and no touch devices ends
    });
	
	
	function subCat() {
		var subCatProduct = $('.sub-categories-for-product-sorted');
		subCatProduct.find('ul').remove();
		var subCatElements = subCatProduct.find('div p').size();
		if ( $('body.set-width-5').length > 0 ) {
			var subcatcols = 2;
			subCatProduct.append('<ul class="double"></ul>');
		}
		else {
			var subcatcols = 1;
			subCatProduct.append('<ul class="single"></ul>');
		}
		/*else {
			var subcatcols = 3;
			subCatProduct.prepend('<ul class="triple"></ul>');
		}*/
		for ( var i=1; i<=subcatcols; i++ ) {
			subCatProduct.find('ul').append('<li></li>');
			for ( var j=1; j<=Math.ceil(subCatElements/subcatcols); j++ ) {
				subCatProduct.find('div p:nth-of-type('+eval((i-1)*Math.ceil(subCatElements/subcatcols)+j)+')').clone().appendTo(subCatProduct.find('ul li:nth-of-type('+i+')'));
			}
		}
		subCatProduct.find('a').hover(
			function() {
				if ( $(this).height() > 17 && $(this).parent().index()+1 < $(this).parents('li').children('p').size() ) {
					$(this).addClass('over');
					$(this).css({
						'padding-bottom': '17px'
					});
				}
				if ( $(this).height() > 34 ) {
					$(this).css({
						'padding-bottom': '0'
					});
				}
			},
			function() {
				if ( $(this).hasClass('over') ) {
					$(this).removeClass('over');
					$(this).css({
						'padding-bottom': '0'
					});
				}
			}
		);
	}

    $(function() {
		if ( $('.sub-categories-for-product-sorted').length > 0 ) {
			subCat();
		}
		$(window).load(function() {
			subCat();
		});
		$(window).resize(function() {
			subCat();
		});
    });

    $(document).ready(function() {
        if ( $('.adv-slider').length > 0 ) {
            $('.adv-slider .tab').css({
                'left': -$('.adv-slider').outerWidth()+'px'
            });
            $('.adv-slider .tab:first-child').css({
                'left': '0'
            });
            $('.adv-slider .nav li:first-child').addClass('active');
            $('.adv-slider .nav li a').bind('click', function() {
                var e = $(this).parents('.adv-slider');
                var p = e.find('.tab[data-tab="'+eval($(this).parents('ul').find('li.active').index()+1)+'"]');
                var n = e.find('.tab[data-tab="'+$(this).attr('href')+'"]');
                var w = e.outerWidth();
                if ( n.attr('data-tab') > p.attr('data-tab') ) {
                    p.stop(true,true).animate({
                        'left': w+'px'
                    }, 250);
                    n.css({
                        'left': -w+'px'
                    }).stop(true,true).animate({
                        'left': '0'
                    }, 250);
                }
                if ( n.attr('data-tab') < p.attr('data-tab') ) {
                    p.stop(true,true).animate({
                        'left': -w+'px'
                    }, 250);
                    n.css({
                        'left': w+'px'
                    }).stop(true,true).animate({
                        'left': '0'
                    }, 250);
                }
                $(this).parent().addClass('active').siblings().removeClass();
                return false;
            });
            $('.adv-slider .products > ul').jcarousel({
                scroll: 1,
                animation: 250
            });
            $('.adv-slider .products').bind('swipeleft', function() {
                $('.adv-slider .products .jcarousel-next').trigger('click');
            });
            $('.adv-slider .products').bind('swiperight', function() {
                $('.adv-slider .products .jcarousel-prev').trigger('click');
            });
            $('.adv-slider .listing > ul').jcarousel({
                scroll: 1,
                animation: 250
            });
            $('.adv-slider .listing').bind('swipeleft', function() {
                $('.adv-slider .listing .jcarousel-next').trigger('click');
            });
            $('.adv-slider .listing').bind('swiperight', function() {
                $('.adv-slider .listing .jcarousel-prev').trigger('click');
            });
        }
    });
    $(window).resize(function() {
        if ( $('.adv-slider').length > 0 ) {
            $('.adv-slider .tab').css({
                'left': -$('.adv-slider').outerWidth()+'px'
            });
            $('.adv-slider .tab[data-tab="'+eval($('.adv-slider .nav li.active').index()+1)+'"]').css({
                'left': '0'
            });
        }
    })

    function advAdaptive() {
        var w = 300;
        if ( $('.adv-slider').width() >= 640 && $('.adv-slider').width() < 930 ) {
            w = 600;
        }
        if ( $('.adv-slider').width() >= 930 && $('.adv-slider').width() < 1230 ) {
            w = 900;
        }
        if ( $('.adv-slider').width() >= 1230 && $('.adv-slider').width() < 1530 ) {
            w = 1200;
        }
        if ( $('.adv-slider').width() >= 1530 && $('.adv-slider').width() < 1830 ) {
            w = 1500;
        }
        if ( $('.adv-slider').width() >= 1830 ) {
            w = 1800;
        }
        $('.adv-slider .core .tab .products .jcarousel-container .jcarousel-clip, .adv-slider .core .tab .listing .jcarousel-container .jcarousel-clip').width(w);
    }

    $(function() {
        if ( $('.adv-slider').length > 0 ) {
            advAdaptive();
        }
        $(window).resize(function() {
            advAdaptive();
        });
    });

})(jQuery);

jQuery(document).ready(function() {
	if ( jQuery('.sub-categories-for-product-sorted').length > 0 && jQuery('.ajax_load_image_block').length > 0 ) {
		jQuery('.sub-categories-for-product-sorted').detach().appendTo('.ajax_load_image_block > div');
	}
	jQuery('.product_description_more .drop-more').bind('click', function(event) {
		var t = jQuery(this).parent().find('.drop-cont');
		if ( t.is(':visible') ) {
			t.stop().slideUp(250);
			jQuery(this).removeClass('active');
		}
		else {
			t.stop().slideDown(250);
			jQuery(this).addClass('active');
		}
		event.preventDefault();
	});
});