initGelleryGlobal = function () {
    jQuery(document).ready(function () {
        //навигация миниатюр
        var widthThumb = jQuery('.pager a').outerWidth(); //ширина миниатюры, с учетом бордера, для маргин выставить true
        var Show = 6; //сколько миниатюр показывать
        var tmp = 0; //буфер
        jQuery('.pager-wrap, .navigation').width(Show * widthThumb); //ширина обертки миниатюр
        var vPort = jQuery('.pager-wrap').width();
        var LengthThumb = new Array(); // для итераций
        var step = new Array(); // шаги
        jQuery('.pager').each(function (index) {//индексация наборов миниатюр
            if (jQuery(this).children().length <= Show) {
                jQuery(this).parent().siblings().css('display', 'none');
            }
            LengthThumb[index] = parseInt(jQuery(this).children().length / Show);
            if (jQuery(this).children().length % Show == 0) {
                LengthThumb[index]--;
            }

            step[index] = parseInt(0);
            jQuery(this).attr("data-nav-index", index);
            jQuery(this).children().each(function (ind) {
                jQuery(this).attr("data-slide-index", ind);
            });
        });

        function setThumbsHeightSquare( thumbs ) {
            thumbs.css('height', thumbs.css('width'));
            var img = thumbs.find('img');
            var imgSides = parseInt(img.outerWidth()) - parseInt(img.width());
            img.css('maxHeight', parseInt(thumbs.css('width')) - imgSides - 3);//magic
        }

        var thumbs = jQuery('.pager a');
        setThumbsHeightSquare(thumbs);
        jQuery(window).on('resize', function() {
            setThumbsHeightSquare(thumbs);
        });

        jQuery('.pager-next').click(
            function () {
                var elPager = jQuery(this).siblings('.pager-wrap').find('.pager');
                var currentIndex = elPager.attr('data-nav-index');
                //console.log(currentIndex, step[currentIndex], LengthThumb[currentIndex]);
                if (step[currentIndex] != LengthThumb[currentIndex]) {
                    step[currentIndex]++;
                    tmp = -1 * step[currentIndex] * vPort;
                    elPager.animate({left: tmp + 'px'}, 300);
                    jQuery(this).siblings('.pager-prev').css('display', 'block');
                    //console.log(tmp, step[currentIndex], LengthThumb[currentIndex]);
                }
                if (step[currentIndex] >= LengthThumb[currentIndex]) {
                    jQuery(this).css('display', 'none');
                }
            }
        );

        jQuery('.pager-prev').click(
            function () {
                var elPager = jQuery(this).siblings('.pager-wrap').find('.pager');
                var currentIndex = elPager.attr('data-nav-index');
                //console.log(currentIndex, step[currentIndex], LengthThumb[currentIndex]);
                if (step[currentIndex] <= LengthThumb[currentIndex]) {
                    step[currentIndex]--;
                    tmp = -1 * step[currentIndex] * vPort;
                    elPager.animate({left: tmp + 'px'}, 300);
                    jQuery(this).siblings('.pager-next').css('display', 'block');
                }
                if (step[currentIndex] == 0) {
                    jQuery(this).css('display', 'none');
                }
            }
        );
        // Слайдеры
        //$('.bxslider1').bxSlider({
        //mode: 'fade',
        //pagerCustom: '.bx11',
        //adaptiveHeight: true,
        //preloadImages: 'visible'
        //});
        jQuery('.bxslider2').bxSlider({
            mode: 'fade',
            pagerCustom: '.bx12',
            adaptiveHeight: true,
//                                    captions: true,//выключили подписи внизу картинок
            preloadImages: 'visible',
            onSlideBefore: function($slideElement) {
                var activeImage = jQuery($slideElement).find('img');
                activeImage.addClass('bx-image-opacity-r');
            },
            onSlideAfter: function ($slideElement) {
                var slideHeight = jQuery($slideElement).height();
                var activeImage = jQuery($slideElement).find('img');
                var activeImageHeight = activeImage.height();
//                jQuery($slideElement).find('img').animate({'marginTop': (slideHeight - activeImageHeight) / 2 }, 100);//центрируем изображение по вертикали с анимацией
                jQuery($slideElement).find('img').css({'marginTop': (slideHeight - activeImageHeight) / 2 });//центрируем изображение по вертикали без анимации
                activeImage.removeClass('bx-image-opacity-r');//центрируем изображение по вертикали без анимации
                //jQuery($slideElement).find('.bx-caption').css({'marginTop': (slideHeight - activeImageHeight) / 2 }, 100);//центрируем подпись по вертикали
            },
            onSliderLoad: function (currentIndex) {
                var slideHeight = jQuery('.bxslider2').find('li').eq(currentIndex).height();
                var activeImage = jQuery('.bxslider2').find('li').eq(currentIndex).find('img');
                var activeImageHeight = activeImage.height();
//                jQuery('.bxslider2').find('li').eq(currentIndex).find('img').animate({'marginTop': (slideHeight - activeImageHeight) / 2 }, 100);//центрируем изображение по вертикали с анимацией
                jQuery('.bxslider2').find('li').eq(currentIndex).find('img').css({'marginTop': (slideHeight - activeImageHeight) / 2 });//центрируем изображение по вертикали без анимации
                activeImage.removeClass('bx-image-opacity-r');//центрируем изображение по вертикали без анимации
                //jQuery('.bxslider2').find('li').eq(currentIndex).find('.bx-caption').css({'marginTop': (slideHeight - activeImageHeight) / 2 }, 100);//центрируем изображение по вертикали
                jQuery('.bx-wrapper').find('.bx-viewport').find('li').find('a').on('click', function (event) {
                    event.preventDefault();
                });
            }
        });

        jQuery('body').on('keydown', function (event) {

            if (jQuery('.fancybox-overlay').length == 0) {

                if (event.which == 39) {
                    var activePreview = jQuery('.bxslider2').parent().parent().next().find('a.active');
                    activePreview.next().trigger('click');
                    if (activePreview.next().length == 0) {
                        activePreview.siblings().first().trigger('click');
                    }
                }
                if (event.which == 37) {
                    var activePreview = jQuery('.bxslider2').parent().parent().next().find('a.active');
                    activePreview.prev().trigger('click');
                    if (activePreview.prev().length == 0) {
                        activePreview.siblings().last().trigger('click');
                    }
                }

            }

        });

        //$('.bxslider3').bxSlider({
        //mode: 'fade',
        //pagerCustom: '.bx13',
        //adaptiveHeight: true,
        //preloadImages: 'visible'
        //});

    });

    function galleryPrewiewsMiddle() {
//        jQuery('.navigation.bx12').find('.pager').find('a').each(function () {
//            var img = jQuery(this).find('img');
//            var imgHeight = img.height();
//            if (imgHeight < 90) {
//                img.css({'marginTop': ( 90 - imgHeight ) / 2 - 4});
//            }
//        });
    }

//    if (window.addEventListener) {
//        window.addEventListener('load', galleryPrewiewsMiddle, false);
//    } else if (window.attachEvent) {
//        window.attachEvent('onload', galleryPrewiewsMiddle);
//    }
    //    jQuery(function () {
    //        jQuery('.fancybox').fancybox({
    //            wrapCSS: 'fancybox-custom'
    //        });
    //    });
    jQuery(function(){
         var productGallery = {//see jquery.zoom.js - .prodigal_gallery_left - dirty
            init: function() {
                this.galleryInit();
                this.zoomInit();
                this.resizeFix();
                this.goToTop();
            },
            thumbs: jQuery('.prodigal-thumbs'),
            galleryInit: function() {
                this.thumbs.prodigal({tpl: {sorter: null}});
            },
            zoomInit: function() {
                var self = this;
                this.thumbs.prodigal().on('afterOpen.prodigal', function() {
                    var leftWrapper = jQuery('.prodigal_gallery_left');
                    if ( !self.isTouchDevice() ) {
                        leftWrapper.zoom({
                            on: 'click',
                            cursorStyleElement: 'body'
                        });
                    }
                    self.hammerInit();
                });
            },
            resizeFix: function() {
                var ieDetector = this.ieDetector();
                jQuery(window).resize(function() {
                    jQuery('.prodigal_img_selected').triggerHandler('click');
                    setTimeout(function() {
                        jQuery('.prodigal_img_selected').triggerHandler('click');
                    }, 200);
                });
            },
            goToTop: function() {
                this.thumbs.on('click', function() {
                    jQuery('body, html').scrollTop(0);
                });
            },
            hammerInit: function () {
                if ( this.isTouchDevice() ) {
                    var hammer = new Hammer(jQuery('.prodigal_gallery_left').get(0));
                    hammer.on('pan', function (event) {
                        if (event.direction == 2) {
                            jQuery('.prodigal_gallery_right-button').trigger('click');
                            hammer.off('pan');
                        }
                        if (event.direction == 4) {
                            jQuery('.prodigal_gallery_left-button').trigger('click');
                            hammer.off('pan');
                        }
                    });
                }
            },
            ieDetector: function() {
                return navigator.userAgent.indexOf('MSIE') != -1;
            },
            isTouchDevice: function () {
                return 'ontouchstart' in window // works on most browsers
                    /*|| 'onmsgesturechange' in window*/; // works on ie10
            }
        };

        productGallery.init();
    });
};
//kostyl' slavy zaharov
jQuery(function(){
    initGelleryGlobal();
});