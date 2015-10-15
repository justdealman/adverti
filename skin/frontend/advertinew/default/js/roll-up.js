(function ($) {
    //если требуется корректная инициализация на элементе после его повторной загрузки
    //и инициализации, необходимо добавить к нему атрибут data-rollup-id
    //с уникальным значением, неуникальные значения приведут к некорректной работе при
    //постзагрузочной переинициализации

    //плагин поддерживает следующие настройки:
    //open (default - false) (true, false) - открытие при инициализации
    //openText (default - 'Развернуть') (text) - текст кнопки "Развернуть"
    //closeText: (default - 'Свернуть') (text) - текст кнопки "Свернуть"

    //а также методы:
    //open, при передачи параметра instant со значением true, контейнер будет открыт без анимации
    //close, при передачи параметра instant со значением true, контейнер будет закрыт без анимации

    $.fn.rollUp = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.rollUp');
        }

    };
    $.fn.rollUp.statuses = {};

    var statuses = $.fn.rollUp.statuses;//true - открыт

    var methods = {
        init: function (options) {

            return this.each(function() {

                var rollUp = $(this);
                var data = rollUp.data('rollUp');

                if (!data) {
                    //только если не плагин не был ранее инициализирован
                    rollUp.data('rollUp', 'true');

                    rollUp.data('rollUpOptions', $.extend({
                        open: false,
                        openText: 'Развернуть',
                        closeText: 'Свернуть'
                    }, options));

                    var title = rollUp.children('.roll-up__title');
                    var hasLink = rollUp.hasClass('js-roll-up-show-link');
                    var titleLink;

                    if ( hasLink ) {
                        title.append('<span class="roll-up__title__link"></span>');
                        titleLink = title.find('.roll-up__title__link');
                        rollUp.rollUp('setOpenOrCloseText', rollUp.data('rollUpOptions').closeText,
                            rollUp.data('rollUpOptions').openText, titleLink, title);
                    }

                    rollUp.rollUp('bindShowHide', title);

                    if ( rollUp.data('rollUpOptions').open || statuses[rollUp.attr('data-rollup-id')] ) {
                        rollUp.rollUp('open', true);
                    }

                }
            });
        }
      , open: function( instant ) {
            var title = this.children('.roll-up__title');
            var content = this.children('.roll-up__content');
            var hasLink = this.hasClass('js-roll-up-show-link');
            var titleLink = title.find('.roll-up__title__link');
            content.stop(true, true);
            instant
                ? content.show()
                : content.slideDown();
            title.addClass('active');
            if ( hasLink ) {
                this.rollUp('setOpenOrCloseText', this.data('rollUpOptions').closeText,
                    this.data('rollUpOptions').openText, titleLink, title);
            }

            statuses[this.attr('data-rollup-id')] = true;
            return this;
        }
      , close: function( instant ) {
            var title = this.children('.roll-up__title');
            var content = this.children('.roll-up__content');
            var hasLink = this.hasClass('js-roll-up-show-link');
            var titleLink = title.find('.roll-up__title__link');
            content.stop(true, true);
            instant
                ? content.hide()
                : content.slideUp();
            title.removeClass('active');
            if ( hasLink ) {
                this.rollUp('setOpenOrCloseText', this.data('rollUpOptions').closeText,
                    this.data('rollUpOptions').openText, titleLink, title);
            }

            statuses[this.attr('data-rollup-id')] = false;
            return this;
        }
      , bindShowHide: function( title ) {
            var $this = this;
            title.on('click', function( event ) {
                event.preventDefault();
                statuses[$this.attr('data-rollup-id')]
                    ? $this.rollUp('close')
                    : $this.rollUp('open');
            });
            return $this;
        }
      , setOpenOrCloseText: function( openedText, closedText, titleLinkElement, title ) {
            title.hasClass('active') ? titleLinkElement.text(openedText) : titleLinkElement.text(closedText);
        }
    };

})(jQuery);