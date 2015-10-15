(function($) {
    $(function() {
        //open menu begins
        var openMenu = {
            openMenuItems: $('.open-menu-item'),
            innerItemClass: 'open-menu-item__inner',
            init: function() {
                this.setHoverAnimation();
                this.setZIndexes();
            },
            setHoverAnimation: function() {//вообще слабое место в плане производительности - unHoverAll
                var self = this;
                var defaultHeight = this.openMenuItems.outerHeight();//жестко задана в css
                this.openMenuItems.css('overflow', 'hidden');
                if ( !this.isTouchDevice() ) {
                    this.openMenuItems.hover(function() {
                        self.onHoverAnimate( $(this), defaultHeight );
                    }, function() {
                        self.onHoveOutAnimate( $(this), defaultHeight );
                    });
                } else {
                    this.openMenuItems.on('click', function( event ) {
                        var thisElement = $(this);
                        if ( $(this).hasClass('touchedOnce') && $(event.target).closest('a').length > 0 ) {
                            window.location = $(event.target).closest('a').attr('href');
                        } else if ( !$(this).hasClass('touchedOnce') || $(event.target).closest('a').length > 0 ) {
                            event.preventDefault();
                            unHoverAll(self.openMenuItems, self, defaultHeight);
                            setTimeout(function() {
                                self.onHoverAnimate( thisElement, defaultHeight );
                                thisElement.addClass('touchedOnce');

                                $('body').on('touchstart.openMenuToClose', function( event ) {
                                    if ( $(event.target).closest( self.openMenuItems ).length < 1 ) {
                                        unHoverAll(self.openMenuItems, self, defaultHeight);
                                        $(this).unbind('touchstart.openMenuToClose');
                                    }
                                });
                            }, 0);
                        }
                    });

                    function unHoverAll( openMenuItems, self, defaultHeight ) {
                        openMenuItems.each(function() {
                            $(this).removeClass('touchedOnce');
                            self.onHoveOutAnimate( $(this), defaultHeight );
                        });
                    }
                }
            },
            onHoverAnimate: function( element, defaultHeight ) {
                element.find('.' + this.innerItemClass).stop(true, true);
                element.css('overflow', 'visible');
                var endHeight = element.find('.' + this.innerItemClass).outerHeight();
                element.find('.' + this.innerItemClass).css('height', defaultHeight);
                element.find('.' + this.innerItemClass).animate({
                    'height': endHeight
                }, 150);
            },
            onHoveOutAnimate: function( element, defaultHeight ) {
                element.find('.' + this.innerItemClass).animate({
                    'height': defaultHeight
                }, 200, function() {
                    element.css('overflow', 'hidden');
                    $(this).css('height', 'auto');
                });
            },
            setZIndexes: function() {
                var self = this;
                this.openMenuItems.each(function( index ) {
                    var zIndex = self.openMenuItems.length - index + 20;
                    $(this).css('zIndex', zIndex);
                });
            },
            isTouchDevice: function() {
                return 'ontouchstart' in window;
            }
        };
        openMenu.init();
        //open menu ends
    });
})(jQuery);