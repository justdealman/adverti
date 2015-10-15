jQuery.fn.projectMenu = (function( $ ) {
    return function() {
        var topMenus = $(this);
        topMenus.each(function() {
            if ( $(this).hasClass('initialized') ) return false;
            $(this).addClass('initialized');

            var topMenu = $(this);
            var mainListItems = topMenu.find('.nav-n__list__item');
            var innerFirsts = topMenu.find('.nav-n__inner-first');
            var innerFirstItems = topMenu.find('.nav-n__inner-first__item');
            var innerFirstItemsClass = 'nav-n__inner-first__item';
            var innerFirstItemsLinkClass = 'nav-n__inner-first__item__link';
            var innerLastItemsClass = 'nav-n__inner-last__item';
            var mainLevelLinkClass = 'nav-n__list__item__link';
            var menusWarpperClass = 'nav-n__inner-first-wrapper';
            var deepMenuWrapperClass = 'nav-n__inner-last-wrapper';
            var deepListItemsClass = 'nav-n__inner-last__item';
            var deepListItemsLinkClass = 'nav-n__inner-last__item__link';
            var allLinks = topMenu.find('a');
            var firstWrapperBlock = topMenu.find('.nav-n__inner-first-wrapper');

            addClassToHasChildren(innerFirstItems, deepMenuWrapperClass, mainListItems);
            addClassWhereManyItemsIs(innerFirsts, innerFirstItemsClass, innerLastItemsClass);
            setHover(innerFirstItems, deepMenuWrapperClass, topMenu);
            if ( !is_touch_device() ) {
                topMenu.find('.' + innerFirstItemsClass).first().trigger('mouseenter');
            }

            var mainListItemsLength = mainListItems.length;
            mainListItems.each(function( index ) {
                if ( index > mainListItemsLength / 2 ) {
                    $(this).addClass('second-half-elements');
                }
            });

            if ( is_touch_device() ) {
                $('.' + mainLevelLinkClass).on('click', function( event ) {
                    event.preventDefault();
                    var self = $(this);
                    if ( $(this).next().hasClass('opened-item-menu') ) {
                        setTimeout(function() {
                            self.next().removeClass('opened-item-menu').hide();
                        }, 300);
                    } else {
                        setTimeout(function() {
                            self.next().show().addClass('opened-item-menu');
                        }, 300);
                    }
                });

                $('.' + innerFirstItemsLinkClass).on('click', function( event ) {
                    $(this).parent().siblings().find('.' + innerFirstItemsLinkClass).removeClass('touchedOnce');
                    $(this).parent().siblings().find('.' + deepMenuWrapperClass).hide('touchedOnce');
                    if ( !$(this).hasClass('touchedOnce') ) {
                        event.preventDefault();
                        $(this).addClass('touchedOnce');
                        $(this).parent().find('.' + deepMenuWrapperClass).show();
                    }
                });

//                if ( navigator.userAgent.match(/Android/i) ) {
//
//                    allLinks.on('click', function( event ) {
//                        var link = $(this);
//                        if ( !link.hasClass('thouchedOnce') && link.parent().hasClass('has-children') ) {
//                            allLinks.removeClass('thouchedOnce');
//                            link.addClass('thouchedOnce');
//                            return false;
//                        }
//                        if ( link.hasClass('thouchedOnce') && link.hasClass( mainLevelLinkClass ) ) {
//                            event.preventDefault();
//                        }
//
//                        innerFirstItems.one('click', function() {
//                            return false;
//                        });
//                    });
//                    topMenu.find('.' + mainLevelLinkClass).on('click', function( event ) {
//                        event.preventDefault();
//                    });
//                    topMenu.find('.' + mainLevelLinkClass).on('click', function() {
//                        firstWrapperBlock.toggle();
//                        $(this).toggleClass('nav-n__list__item__link_hovered');
//                    });
//                    topMenu.find('.' + mainLevelLinkClass).one('click', function() {
//                        firstWrapperBlock.show();
//                        $(this).addClass('nav-n__list__item__link_hovered');
//                    });
//                    $('body').on('click', function( event ) {
//                        if ( !$(event.target).closest('.nav-n__list__item').length > 0 ) {
//                            $('.thouchedOnce').removeClass('thouchedOnce');
//                        }
//                    });
//                } else {
//                    allLinks.on('touchstart', function( event ) {
//                        var link = $(this);
//                        if ( !link.hasClass('thouchedOnce') && link.parent().hasClass('has-children') ) {
//                            allLinks.removeClass('thouchedOnce');
//                            link.addClass('thouchedOnce');
//                            return false;
//                        }
//                        if ( link.hasClass('thouchedOnce') && link.hasClass( mainLevelLinkClass ) ) {
//                            event.preventDefault();
//                        }
//                    });
//                    topMenu.find('.' + mainLevelLinkClass).on('touchstart', function() {
//                        firstWrapperBlock.toggle();
//                        $(this).toggleClass('nav-n__list__item__link_hovered');
//                    });
//                    topMenu.find('.' + mainLevelLinkClass).one('touchstart', function() {
//                        firstWrapperBlock.show();
//                        $(this).addClass('nav-n__list__item__link_hovered');
//                    });
//                    $('body').on('touchstart', function( event ) {
//                        if ( !$(event.target).closest('.nav-n__list__item').length > 0 ) {
//                            $('.thouchedOnce').removeClass('thouchedOnce');
//                        }
//                    });
//                }

            } else {
                setAdditionalCols(innerFirstItems, deepMenuWrapperClass);
            }

            if ( topMenu.hasClass('nav-n_main') ) {//добавляем фон всему меню
                topMenu.find('.' + innerFirstItemsClass).each(function() {
                    $(this).prepend('<div class="nav-n__list__item__bg"></div>');
                });
                var bgs = topMenu.find('.nav-n__list__item__bg');
                bgs.each(function() {
                    $(this).parent().hasClass('inner-list-wrapper-bottom-pos')
                        ? $(this).css('width', 220 * 3 + 30)
                        : $(this).css('width', 220 * 2 + 30);

                   if ($(this).parent().hasClass('custom')) $(this).css('width', 220+20);
                });
            }
        });

        function addClassToHasChildren( innerFirstItems, deepMenuWrapperClass, mainListItems ) {
            mainListItems.each(function() {
                if ( $(this).find('li').length > 0 ) {
                    $(this).addClass('has-children');
                }
            });
            innerFirstItems.each(function() {
                if ( $(this).children('.' + deepMenuWrapperClass).length > 0 ) {
                    $(this).addClass('has-children');
                }
            });
        }

        function addClassWhereManyItemsIs( innerFirsts, innerFirstItemsClass, innerLastItemsClass ) {
            innerFirsts.each(function() {
                var thisFirstItems = $(this).find('.' + innerFirstItemsClass);
                var thisFirstItemsLength = thisFirstItems.length;
                thisFirstItems.each(function() {
                    if ( thisFirstItemsLength < $(this).find('.' + innerLastItemsClass).length ) {
                        $(this).addClass('inner-list-wrapper-bottom-pos');
                    }
                });
            });
        }

        function setHover( innerFirstItems, deepMenuWrapperClass, topMenu ) {
            var timer;
            innerFirstItems.hover(function() {
                var self = this;
                clearInterval(timer);
                timer = setTimeout(function() {
                    jQuery(self).find('.' + deepMenuWrapperClass).css('display', 'block').parent().siblings()
                        .find('.' + deepMenuWrapperClass).css('display', 'none');
                    jQuery(self).addClass('active').siblings().removeClass('active');
                    if ( topMenu.hasClass('nav-n_main') ) {
                        var bg = $(self).find('.nav-n__list__item__bg');
                        if ( $(self).find('.' + deepMenuWrapperClass).outerHeight() > bg.outerHeight() ) {
                            bg.css('height', parseInt(bg.css('height')) + parseInt($(self)
                                .find('.' + deepMenuWrapperClass).outerHeight()) - parseInt(bg.outerHeight()) + 20);
                        }
                    }
                }, 250);
            });
        }

        function setAdditionalCols(innerFirstItems, deepMenuWrapperClass) {//если количество пунктов в подменю
                                                                           // велико, делим пункты на слолбцы
            innerFirstItems.each(function() {
                if ( $(this).find('.nav-n__inner-last__item').length > innerFirstItems.length ) {
                    var list = $(this).find('.nav-n__inner-last');
                    var items = list.find('.nav-n__inner-last__item');
                    var newContainersNeed = Math.ceil(($(this).find('.nav-n__inner-last__item').length
                        / innerFirstItems.length));//сколько нужно новых контейнеров
                    for (var i = 0; i < newContainersNeed; i++) {
                        $('<ul class="nav-n__inner-last"></ul>').insertAfter(list);
                    }
                    list.parent().find('.nav-n__inner-last').each(function( index ) {
                        if ( index != 0 ) {
                            $(this).css({
                                'position': 'absolute'
                                , 'top': 0
                            });
                        }
                    });

                    var itemsStep = +newContainersNeed;//*количество столбцов
                    var itemCounter = 0;//изменяется от 0 до возможного количества элементов в столбце (items.length / itemsStep)
                    var itemsWrapperCounter = 1;//здесь храним индекс контейнера, в который будет помещен элемент
                    items.each(function( index ) {
                        if ( itemCounter < (items.length / itemsStep).toFixed() && index > (items.length / itemsStep).toFixed() ) {//элемент должен попасть в столбец, кроме первого, который был изначально
//                            $(this).attr('data-tt', (itemsWrapperCounter).toFixed());
                            $(this).appendTo( list.parent().find('.nav-n__inner-last').eq( (itemsWrapperCounter).toFixed() ) );
                            itemCounter++;
                        } else if ( !(index > (items.length / itemsStep).toFixed()) ) {//элемент должен попасть в первый изначальный столбец, чего мы не допускаем
                            itemCounter = 0;
                        } else {//последний элемент из очереди, который должен попасть в столбец
//                            $(this).attr('data-tt', (itemsWrapperCounter).toFixed());
                            $(this).appendTo( list.parent().find('.nav-n__inner-last').eq( (itemsWrapperCounter).toFixed() ) );
                            itemsWrapperCounter++;
                            itemCounter = 0;
                        }
                    });
                    $(this).find('.' + deepMenuWrapperClass).css('width', +newContainersNeed * 220 + 2);//растягиваем фоновый элемент за столбцами
                }
            });
        }

        function is_touch_device() {
            return 'ontouchstart' in window; // works on most browsers
                //|| 'onmsgesturechange' in window; // works on ie10
        }
    }
})(jQuery);