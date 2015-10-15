jQuery(function() {

    jQuery('.js-min-rate-alert, .js-add-call, .js-order-popup, .js-basket-added-popup, .js-add-consult,  .js-add-min-count, .js_subscribe_popup, .js-add-to-cart-popup-alert').popups();//инициализируем попап на нужных нам элементах, если при показе окна нужен полупрозрачный фон, то добавляем элементу класс .js-show-bg, если нужно закрывать попап при клике по прозрачной обоасти, то добавляем к элементу класс .js-close-bg-click

    //минимальный тираж для карточки в каталоге
    jQuery('.js-x-closer-min-rate-alert').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-min-rate-alert').popups('hidePopup', jQuery('.js-min-rate-alert'));
    });

    // обраный звонок
    jQuery('.js-add-call-button').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-call').popups('showPopup', jQuery('.js-add-call'));//так открываем указанный попап
    });

    jQuery('.js-add-call-closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-call').popups('hidePopup', jQuery('.js-add-call'));
    });

    jQuery('.js-x-closer-add-call').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-call').popups('hidePopup', jQuery('.js-add-call'));
    });


    // podpisat'sja na rassylku
    jQuery('.js_subscribe_link').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js_subscribe_popup').popups('showPopup', jQuery('.js_subscribe_popup'));//так открываем указанный попап
    });

    jQuery('.js_subscribe_closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js_subscribe_popup').popups('hidePopup', jQuery('.js_subscribe_popup'));
    });

    jQuery('.js-x-closer-subscribe').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js_subscribe_popup').popups('hidePopup', jQuery('.js_subscribe_popup'));
    });

    // минимальный тираж
    jQuery('.js-add-min-count-closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-min-count').popups('hidePopup', jQuery('.js-add-min-count'));
    });

    jQuery('.js-x-closer-add-min-count').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-min-count').popups('hidePopup', jQuery('.js-add-min-count'));
    });

    // обраный звонок
    jQuery('.js-add-consult-button').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-validate-form-consult textarea').html('Здравствуйте, у меня есть вопрос по товару "'+jQuery('h1.js-title').html()+'":');
        jQuery('.js-add-consult').popups('showPopup', jQuery('.js-add-consult'));//так открываем указанный попап
    });

    jQuery('.js-add-consult-closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-consult').popups('hidePopup', jQuery('.js-add-consult'));
    });

    jQuery('.js-x-closer-add-consult').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-consult').popups('hidePopup', jQuery('.js-add-consult'));
    });

    // dobavlenie v checkout cart

    jQuery('.js-add-to-cart-popup').on('click', function( event ) {
        event.preventDefault();
        //так открываем указанный попап
    });

    jQuery('.js-order-popup-closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-basket-added-popup').popups('hidePopup', jQuery('.js-basket-added-popup'));
    });

    jQuery('.js-x-closer-order-popup').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-basket-added-popup').popups('hidePopup', jQuery('.js-basket-added-popup'));
    });

    // алерт при добавление существующего товара

    jQuery('.js-add-to-cart-popup-alert').on('click', function( event ) {
        event.preventDefault();
        //так открываем указанный попап
    });

    jQuery('.js-add-to-cart-alert-close').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-basket-added-popup-alert').popups('hidePopup', jQuery('.js-add-to-cart-popup-alert'));
    });

    jQuery('.js-x-closer-order-popup-alert').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-add-to-cart-popup-alert').popups('hidePopup', jQuery('.js-add-to-cart-popup-alert'));
    });

    //shipping in progress checkout cart cart

    jQuery('.js-proccessing').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-order-popup').popups('showPopup', jQuery('.js-order-popup'));//так открываем указанный попап
    });

    jQuery('.js-cart-popup-closer').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-order-popup').popups('hidePopup', jQuery('.js-order-popup'));
    });

    jQuery('.js-x-closer-cart-popup').on('click', function( event ) {
        event.preventDefault();
        jQuery('.js-order-popup').popups('hidePopup', jQuery('.js-order-popup'));
    });

});