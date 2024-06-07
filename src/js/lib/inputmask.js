import Inputmask from 'inputmask';
window.$ = window.jQuery = require('jquery');
// --------------------------------------------------------------------------

const initInputmask = () => {
    const telInputCollection = document.querySelectorAll('[data-tel-mask]');

    if (telInputCollection.length) {
        telInputCollection.forEach((input) => {
            Inputmask({ mask: '+7 (999) 999-99-99', showMaskOnHover: false, clearIncomplete: true }).mask(
                input
            );
        });
    }

    const birthInputCollection = document.querySelectorAll('[data-birth-mask]');
    if (birthInputCollection.length) {
        birthInputCollection.forEach((input) => {
            Inputmask({ mask: '99.99.9999', showMaskOnHover: false, clearIncomplete: true }).mask(
                input
            );
        });
    }


    $('.lk__nav-mob-selector-top').on('click', function () {
        $('.lk__nav-mob-selector-bottom').slideToggle();
        $(this).toggleClass('isActive');
      });
      $('.lk__nav-mob-selector-item').on('click', function () {
        $('.lk__nav-mob-selector-item').removeClass('isActive');
        $(this).addClass('isActive');
        $('.lk__nav-mob-selector-top').removeClass('isActive');
        $('.lk__nav-mob-selector-top').find('span').text($(this).text());
        $('.lk__nav-mob-selector-bottom').slideToggle();
      });
};
initInputmask();
