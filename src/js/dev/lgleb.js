window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.payment-info__nav') && paumentInfoDropdown();
});

const paumentInfoDropdown = () => {
    $('.payment-info__nav-mob-selector-top').on('click', function () {
        $('.payment-info__nav-mob-selector-bottom').slideToggle();
        $(this).toggleClass('isActive');
    });
    $('.payment-info__nav-mob-selector-item').on('click', function () {
        $('.payment-info__nav-mob-selector-item').removeClass('isActive');
        $(this).addClass('isActive');
        $('.payment-info__nav-mob-selector-top').removeClass('isActive');
        $('.payment-info__nav-mob-selector-top').find('span').text($(this).text());
        $('.payment-info__nav-mob-selector-bottom').slideToggle();
    });
};
