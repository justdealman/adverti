(function($) {
    jQuery.fn.popups = function ( selector, options ) {

    options = jQuery.extend({

    }, options);
    return this.each(function () {

        //variables begins
        var popupInner = $(this);
        //var popup = $(this).wrap('<div class="popup"></div>').parent();
        var bg = $('<div class="popup-bg popup-bg_gray js-popup-bg"></div>');
        //variables ends

        //functions begins
//        var changePopupContent = function( element, content ) {
//            element.html( content );
//        };
//
//        var clearPopupContent = function() {
//            popup.html( '' );
//        };

        var init = function( popupInner ) {
            if ( popupInner.hasClass('js-close-bg-click') ) {
                setCloseOnBgClick();
            }
            return popupInner.wrap('<div class="popup"></div>').parent().addClass('js-popups');
        };

        var setCloseOnBgClick = function() {
            $('body').on('click', function( event ) {
                if ( $('.js-popups > .active-popups' ).length > 0 && $(event.target).closest('.active-popups').length == 0 ) {
                    hidePopup( $('.js-popups > .active-popups') );
                }
            });
        };

        var showPopup = function( element ) {
            element.parent().css('z-index', 200);
            if ( element.hasClass('js-show-bg') ) {
                element.parent().before( bg );
                bg.show();//без анимации
                element.parent().css('z-index', 500);
            }
            element.parent().css('overflow', 'hidden');
            element.parent().animate({
                'left': 0
            },
            1,//без анимации
            function() {
                element.parent().css('overflow', 'auto');
                element.addClass('active-popups');
            });
        };

        var hidePopup = function( element ) {
            element.parent().css('overflow', 'hidden');
            element.removeClass('active-popups');
            element.parent().animate({
                'left': '100%'
            },
             1,//без анимации
             function() {
                element.parent().css({
                    'overflow': 'auto',
                    'left': '-100%'
                });
                if ( element.hasClass('js-show-bg') ) {
                    element.parent().prev().hide(0, function() {//без анимации
                       element.parent().prev().remove();
                    });
                }
            });
        };
        //functions ends


        //methods begins
        var methods = {
//            changePopupContent: function( element, content ) {
//                changePopupContent( element, content );
//            },
//            clearPopupContent: function() {
//                clearPopupContent();
//            },
            init: function( element ) {
                init( element );
            },
            showPopup: function( element ) {
                showPopup( element );
            },
            hidePopup: function( element ) {
                hidePopup( element );
            }
        };
        //methods ends


        //methods calling logic begins
        jQuery.fn.popups = function( method ) {
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                jQuery.error( 'Метод с именем ' +  method + ' не существует для jQuery.popups' );
            }
        };
        //methods calling logic ends


        //plugin code begins
        var popup = init( popupInner );
        //plugin code ends

    });



};
})(jQuery);