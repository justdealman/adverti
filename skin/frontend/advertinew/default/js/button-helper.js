jQuery.fn.buttonHelper = (function( $ ) {
    return function() {
        var buttonHelper = this;
        buttonHelper.each(function() {
            var buttonHelper = $(this);
            var thisClassName = 'button-helper';
            var buttonHelperButton = buttonHelper.find('.button-helper__button');
            var buttonHelperText = buttonHelper.find('.button-helper__text');
            var body = $('body');

            buttonHelperButton.on('click', function( event ) {
                event.preventDefault();
                if ( buttonHelperButton.hasClass('active') ) {
                    body.find('.button-helper__button').removeClass('active');
                    body.find('.button-helper__text').hide();
                }else{
                    body.find('.button-helper__button').removeClass('active');
                    body.find('.button-helper__text').hide();
                    buttonHelperText.show(150);
                    buttonHelperButton.toggleClass('active');
                    body.on('click.buttonHelper', function( event ) {
                        if ( $(event.target).closest('.button-helper').length <=0 ) {
                            body.find('.button-helper__button').removeClass('active');
                            body.find('.button-helper__text').hide();
                        }
                    });

                }
            });
        });
    }
})(jQuery);