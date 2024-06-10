window.$ = window.jQuery = require('jquery');

document.addEventListener('DOMContentLoaded', function () {
    try {
        lkDropdownMob();
    } catch {}
});

function lkDropdownMob() {
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
}
