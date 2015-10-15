window.promoSlider = (function() {

    return {
        elements: {
            sliderWrapper: function() {return jQuery('.js-promo-slider')},
            slider: function() {return jQuery('.js-promo-slider').find('.promo-slider__inner')},
            controls: function() {return jQuery('.js-promo-slider').find('.promo-slider__controls').find('a')},
            getThumbs: function () {
                return jQuery('.js-promo-slider .thumbNav a')
            }
        },
        init: function ( startSlide ) {
            var self = this;
            if ( this.elements.slider().length > 0 ) {
                this.elements.slider().anythingSlider({
                    expand: true,
                    buildStartStop: false,
                    hashTags: false,
                    autoplay: false,
                    startPanel: startSlide + 1,
                    onSlideComplete: function (slider) {
                        var curSlideIndex = slider.$currentPage.index() - 1;
                        self.elements.controls().eq(curSlideIndex).addClass('active').parent().siblings().find('a').removeClass('active');
                    },
                    onInitialized: function (event, slider) {
                        var curSlideIndex = slider.$currentPage.index() - 1;
                        self.elements.controls().eq(curSlideIndex).addClass('active').parent().siblings().find('a').removeClass('active');
                    }
                });
                this.hammerInit();
                this.controlsInit();
            }
        },
        hammerInit: function () {
            var self = this;
            if ( self.isTouchDevice() ) {
                var hammerPromoSlider = new Hammer(this.elements.slider().get(0));
                hammerPromoSlider.on('pan', function (event) {
                    if (event.direction == 2) {
                        self.elements.sliderWrapper().find('.arrow.forward').trigger('click');
                    }
                    if (event.direction == 4) {
                        self.elements.sliderWrapper().find('.arrow.back').trigger('click');
                    }
                });
            }
        },
        controlsInit: function () {
            var self = this;
            this.elements.controls().on('click', function (event) {
                event.preventDefault();
                var thisIndex = jQuery(this).parent().parent().find('a').index(jQuery(this));
                self.elements.getThumbs().eq(thisIndex).trigger('click');
            });
        },
        isTouchDevice: function() {
            return 'ontouchstart' in window;
        }
    };

})();