(function ($) {
    $(function () {
        window.adaptiveSlider = {
            getPremade: function (slider) {
                return slider.find('.adaptive-slider__premade').clone().children();
            },
            getPlaceForSlides: function (slider) {
                return slider.find('.adaptive-slider__inner')
            },
            getPagesInfoPages: function (slider) {
                return slider.find('.adaptive-slider__pages-info__pages')
            },
            getToBeginLink: function (slider) {
                return slider.find('.adaptive-slider__pages-info__tobegin')
            },
            getThumbs: function (slider) {
                return slider.find('.thumbNav a')
            },
            init: function (slider, elementsInSlideAmount, sliderType) {
                var self = this;

                slider.each(function() {
                    var slider = $(this);

                    self.destroy(slider);
                    self.createPlaceForSlides(slider);
                    var placeForSlides = self.getPlaceForSlides(slider);
                    self.createSlides(slider, elementsInSlideAmount);
                    self.initToBeginButton(slider, self);

                    placeForSlides.anythingSlider({
                        expand: true,
                        hashTags: false,
                        mode: sliderType,
                        autoplay: false,
                        buildStartStop: false,
                        onInitialized: function (event, pluginSlider) {
                            slider.removeClass('alone-slide-in-slider');
                            if ( pluginSlider.pages <= 1 ) {
                                self.getPagesInfoPages(slider).remove();
                                self.getToBeginLink( slider ).remove();
                                slider.find('.delimeter').remove();
                                slider.addClass('alone-slide-in-slider');
                            }
                            var currentSlideIndex = pluginSlider.$currentPage.index();//что то придумать
                            self.getPagesInfoPages(slider).text('Страница ' + currentSlideIndex + ' из '
                                + self.getSlidesAmount(slider, elementsInSlideAmount));
                            currentSlideIndex == 1
                                ? (self.getToBeginLink( slider ).hide(), slider.find('.delimeter').hide())
                                : (self.getToBeginLink( slider ).show(), slider.find('.delimeter').show());//что то придумать delimeter
                        },
                        onSlideComplete: function (pluginSlider) {
                            var currentSlideIndex = pluginSlider.$currentPage.index();//что то придумать
                            self.getPagesInfoPages(slider).text('Страница ' + currentSlideIndex + ' из '
                                + self.getSlidesAmount(slider, elementsInSlideAmount));
                            currentSlideIndex == 1
                                ? (self.getToBeginLink( slider ).hide(), slider.find('.delimeter').hide())
                                : (self.getToBeginLink( slider ).show(), slider.find('.delimeter').show());//что то придумать delimeter
                        }
                    });

                    self.hammerInit(slider);
                    self.centerCorrector(slider, elementsInSlideAmount);
                });

            },
            createPlaceForSlides: function (slider) {
                $('<ul class="adaptive-slider__inner"></ul>').prependTo(slider);
            },
            destroy: function (slider) {
                slider.find('.anythingSlider').remove();
            },
            createSlides: function (slider, elementsInSlideAmount) {
                var slidesAmount = this.getSlidesAmount(slider, elementsInSlideAmount);
                for (var i = 0; i < slidesAmount; i++) {
                    this.getPlaceForSlides(slider).append('<li class="adaptive-slider__item"><div class="adaptive-slider__content"></div></li>');
//                            $('<li class="adaptive-slider__item"><div class="adaptive-slider__content"></div></li>').appendTo(this.getPlaceForSlides(slider));
                }
                var slides = slider.find('.adaptive-slider__item').find('.adaptive-slider__content');
                var currentSlideIndex = 0;
                if (elementsInSlideAmount > 1) {
                    var elementsInSlideAmountForCycle = elementsInSlideAmount;
                    this.getPremade(slider).each(function (index) {
                        index++;

                        if (index > elementsInSlideAmountForCycle) {
//                                    console.log('текущий слайд >');
                            currentSlideIndex++;
                            elementsInSlideAmountForCycle += elementsInSlideAmount;
                        }
                        slides.eq(currentSlideIndex).append($(this));
//                                console.log( 'Индекс премада:' + index + ' ' + 'Текущий слайд:' + currentSlideIndex + ' ' + 'Всего слайдов:' + elementsInSlideAmount );
                    });
                } else if (elementsInSlideAmount == 1) {
                    this.getPremade(slider).each(function (index) {
                        slides.eq(index).append($(this));
                    });
                }
            },
            getSlidesAmount: function (slider, elementsInSlideAmount) {
                return Math.ceil(this.getPremade(slider).length / elementsInSlideAmount);
            },
            hammerInit: function (slider) {
                if ( this.isTouchDevice() ) {
                    var hammerAdaptiveSlider = new Hammer(this.getPlaceForSlides(slider).get(0));
                    hammerAdaptiveSlider.on('pan', function (event) {
                        if (event.direction == 2) {
                            slider.find('.arrow.forward').trigger('click');
                        }
                        if (event.direction == 4) {
                            slider.find('.arrow.back').trigger('click');
                        }
                    });
                }
            },
            centerCorrector: function (slider, elementsInSlideAmount) {
                slider.find('.adaptive-slider__content').each(function () {
                    if ($(this).children().length < elementsInSlideAmount) {
                        $(this).css({'textAlign': 'left', 'marginLeft': '9px'});
                    }
                });
            },
            initToBeginButton: function (slider, self) {
                var toBeginButton = this.getToBeginLink(slider);
                if (toBeginButton) {
                    toBeginButton.on('click', function (event) {
                        event.preventDefault();
                        self.getThumbs(slider).first().trigger('click');
                    });
                }
            },
            isTouchDevice: function() {
                return 'ontouchstart' in window;
            }
        };

        var body = $('body');
        body.on('changeSize5', function () {
            adaptiveSlider.init($('.js-adaptive-slider-top'), 1, 'v');
        })
            .on('changeSize4', function () {
                adaptiveSlider.init($('.js-adaptive-slider-top'), 1, 'v');
            })
            .on('changeSize3', function () {
                adaptiveSlider.init($('.js-adaptive-slider-top'), 3, 'h');
            })
            .on('changeSize2', function () {
                adaptiveSlider.init($('.js-adaptive-slider-top'), 2, 'h');
            })
            .on('changeSize1', function () {
                adaptiveSlider.init($('.js-adaptive-slider-top'), 1, 'h');
            });

        body.on('changeSize5', function () {
            adaptiveSlider.init($('.js-adaptive-slider-fsize'), 5, 'h');
        })
            .on('changeSize4', function () {
                adaptiveSlider.init($('.js-adaptive-slider-fsize'), 4, 'h');
            })
            .on('changeSize3', function () {
                adaptiveSlider.init($('.js-adaptive-slider-fsize'), 3, 'h');
            })
            .on('changeSize2', function () {
                adaptiveSlider.init($('.js-adaptive-slider-fsize'), 2, 'h');
            })
            .on('changeSize1', function () {
                adaptiveSlider.init($('.js-adaptive-slider-fsize'), 1, 'h');
            });
    });
})(jQuery);