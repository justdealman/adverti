(function ($) {
    $.fn.ukTabs = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.ukTabs');
        }

    };

    var methods = {
        init: function (options) {

            return this.each(function() {

                var ukTab = $(this);
                var data = ukTab.data('ukTab');

                if (!data) {
                    //только если не плагин не был ранее инициализирован
                    ukTab.data('ukTab', 'true');

                    ukTab.data('ukTabOptions', $.extend({
                        active: 0
                      , needShowAll: true
                      , showAllPos: 'first'
                    }, options));

                    var links = ukTab.find('.pr-tabs__header__link');
                    var content = ukTab.find('.pr-tabs__content');
                    var contentItems = ukTab.find('.pr-tabs__content__item');

                    if ( ukTab.data('ukTabOptions').needShowAll ) {
                        ukTab.ukTabs('addShowAllLink', links, ukTab.data('ukTabOptions').showAllPos);
                    }

                    links = ukTab.find('.pr-tabs__header__link');// + .tabs__header__link-show-all if exists

                    links.on('click', function( event ) {
                        event.preventDefault();
                        if ( $(this).hasClass('tabs__header__link-show-all') ) {
                            $(this).addClass('active').siblings().removeClass('active');
                            contentItems.addClass('active');
                            ukTab.addClass('pr-tabs_show-all');
                            return;
                        }

                        var isShowAllTabsLinksFirst = ukTab.find('.tabs__header__link-show-all').index() == 0;

                        var linkIndex;
                        ukTab.find('.tabs__header__link-show-all').index() == 0
                        ? linkIndex = $(this).index() - 1
                        : linkIndex = $(this).index();

                        contentItems.eq( linkIndex ).addClass('active').siblings().removeClass('active');
                        $(this).addClass('active').siblings().removeClass('active');
                        ukTab.removeClass('pr-tabs_show-all');

                        if ( 'ontouchstart' in window ) {
                            $('body, html').animate({
                                scrollTop: content.offset().top
                            });
                        }
                    });

                    links.eq( ukTab.data('ukTabOptions').active ).trigger('click');
                }
            });
        }
      , addShowAllLink: function( links, position ) {
            var link = links.eq(0).clone(true).addClass('tabs__header__link-show-all');
            link.attr('href', '#');
            var linksParent = links.parent();
            position == 'first'
                ? link.prependTo( linksParent )
                : link.appendTo( linksParent );

            link.text('Показать все');
        }
    };

})(jQuery);