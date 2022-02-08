(function ($) {
    "use strict";
    var contactNumber = +201023605582;
    $('.close-popup').on("click", function () {
        $('.whatsapp-area').css('display', 'none');
    });
    $('#form-area').submit(function (event) {
        var msg = document.getElementById('whats-in').value;
        var relmsg = msg.replace(/ /g, "%20");
        window.open('https://wa.me/' + contactNumber + '?text=' + relmsg, '_blank');
        event.preventDefault();
    });
    $(window).on('scroll', function () {
        var speed = 1000;
        if ($(window).scrollTop() >= 500) {
            $('.chat-button-area').addClass('zoomIn');
            $('.chat-button-area').removeClass('zoomOut');
            setTimeout(function () {
                $('.chat-button-area').css('display', 'block');
            }, speed);
        } else {
            $('.chat-button-area').removeClass('zoomIn');
            $('.chat-button-area').addClass('zoomOut');
            setTimeout(function () {
                $('.chat-button-area').css('display', 'none');
            }, speed);
        }
        if ($(window).scrollTop() >= 1000) {
            $('.whatsapp-popup').addClass('bounceInDown');
            $('.whatsapp-popup').removeClass('fadeOut');
            setTimeout(function () {
                $('.whatsapp-popup').css('display', 'block');
            }, speed);
            setTimeout(function () {
                $('.chat-area').addClass('bounceIn');
                $('.chat-area').css('visibility', 'visible');
            }, 2000);
        } else {
            $('.whatsapp-popup').removeClass('bounceInDown');
            $('.whatsapp-popup').addClass('fadeOut');
            setTimeout(function () {
                $('.whatsapp-popup').css('display', 'none');
            }, speed);
        }
    });
})(jQuery);