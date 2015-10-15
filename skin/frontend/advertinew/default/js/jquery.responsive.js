(function( $ ){
    var methods = {
        init: function( options ) {
            return this.each(function(){
                var element = $(this);
                var data = element.data('responsive');

                if ( ! data ) {
                    element.data('responsive', true);

                    var setContainerWidth = function () {
                        var windowWidth = $(window).width();
                        var contentWidth;

                        if (windowWidth < 450) contentWidth = 1;
                        if (windowWidth >= 450 && windowWidth < 641) contentWidth = 2;
                        if (windowWidth >= 641 && windowWidth < 820) contentWidth = 3;
                        if (windowWidth >= 820 && windowWidth < 1100) contentWidth = 4;
                        if (windowWidth >= 1100) contentWidth = 5;

                        switch (contentWidth) {
                            case 1:
                                if (setContainerWidth.sizeValue != contentWidth) {
                                    $('body').trigger('changeSize1');
                                    setContainerWidth.sizeValue = contentWidth;
                                }
                                break;
                            case 2:
                                if (setContainerWidth.sizeValue != contentWidth) {
                                    $('body').trigger('changeSize2');
                                    setContainerWidth.sizeValue = contentWidth;
                                }
                                break;
                            case 3:
                                if (setContainerWidth.sizeValue != contentWidth) {
                                    $('body').trigger('changeSize3');
                                    setContainerWidth.sizeValue = contentWidth;
                                }
                                break;
                            case 4:
                                if (setContainerWidth.sizeValue != contentWidth) {
                                    $('body').trigger('changeSize4');
                                    setContainerWidth.sizeValue = contentWidth;
                                }
                                break;
                            case 5:
                                if (setContainerWidth.sizeValue != contentWidth) {
                                    $('body').trigger('changeSize5');
                                    setContainerWidth.sizeValue = contentWidth;
                                }
                        }
                    };
                    setContainerWidth.sizeValue = undefined;

                    $(function() {
                        setContainerWidth();
                    });
                    $(window).on('resize', function () {
                        setContainerWidth();
                    });
                }
            });
        },
        destroy: function( ) {
//            return this.each(function(){
//                var $this = $(this),
//                    data = $this.data('tooltip');
//                // пространства имён рулят!!11
//                $(window).unbind('.tooltip');
//                data.tooltip.remove();
//                $this.removeData('tooltip');
//            })
        }
    };

    $.fn.responsive = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.responsive' );
        }

    };

    function fontSize() {
        var width = 160; // ширина, от которой идет отсчет
        var fontSize = 14; // минимальный размер шрифта
        var maxFontSize = 18; // максимальный размер шрифта
        var blockWidth = jQuery('.cols-4__item').width();
        var multiplier = blockWidth / width;

        if (jQuery('.cols-4__item').width() >= width) fontSize = Math.floor(fontSize * multiplier);
        if (fontSize > maxFontSize) fontSize = maxFontSize;

        jQuery('.promo-product__price__price').css({fontSize: fontSize+'px'});
    }
    jQuery(function() { fontSize(); });
    jQuery(window).resize(function() { fontSize(); });

})( jQuery );