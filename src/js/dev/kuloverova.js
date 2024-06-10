window.$ = window.jQuery = require('jquery');
import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade, Controller, Autoplay } from 'swiper/modules';
import { modules } from '../modules.js';

document.addEventListener('DOMContentLoaded', function () {
    try {
        lkDropdownMob();
    } catch {}
    try {
        lkPurchaseSwipers();
    } catch {}
    try {
        shopifySwiperMin();
    } catch {}
    try {
        inputFileLk();
    } catch {}
    try {
        modalLogin ()
    } catch {}
    try {
        codeInputs('.modal_code__form--phone');
        codeInputs('.modal_code__form--mail');
        codeInputs('.modal_code__form--login');
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

function lkPurchaseSwipers() {
    const swipers = document.querySelectorAll('.lk__purchase-swiper');

    swipers.forEach((item) => {
        let swiper = new Swiper(item, {
            slidesPerView: 'auto',
            spaceBetween: remToPx(2)
        });
    });
}

function shopifySwiperMin() {
    document.querySelectorAll('.shopify__lk-swiper').forEach((carousel) => {
        new Swiper(carousel, {
            modules: [Navigation, Pagination],
            speed: 1500,
            loop: true,
            spaceBetween: remToPx(4),
            navigation: {
                nextEl: carousel.closest('.shopify').querySelector('.swiper-nav__arr_next'),
                prevEl: carousel.closest('.shopify').querySelector('.swiper-nav__arr_prev')
            },
            pagination: {
                el: carousel.closest('.shopify').querySelector('.shopify__fraction'),
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;

                    return cur;
                }
            },
            breakpoints: {
                768: {
                    slidesPerView: 3
                }
            }
        });
    });
}

function inputFileLk() {
    const inputs = document.querySelectorAll('.info-modal__input-file');

    inputs.forEach((item) => {
        item.addEventListener('change', () => {
            let files = Array.from(item.files);
            const type = files[0].type;
            const size = files[0].size;

            if ((type.endsWith('jpg') || type.endsWith('jpeg') ||type.endsWith('png')) && size < 10 * 1024 * 1024 && files.length == 1){
                modules.modal.open('#imageUploadedModal');
                if(document.querySelector('.lk__personal-photo-img-box')) {
                    document.querySelector('.lk__personal-photo-img-box').innerHTML = `
                    <img src="${window.URL.createObjectURL(files[0])}" alt="" />
                   `;
                   document.querySelector('.lk__personal-file-text').textContent = 'Изменить изображение'
                }
            } else {
                modules.modal.open('#imageUnUploadedModal');
            }

            console.log(type)
        });
    });
}

function codeInputs(selector) {
    const parent = document.querySelector(selector)

    const codeInputs = parent.querySelectorAll('.popup__fields-num');
    function handleInput(index) {
        if (codeInputs[index - 1].value && index < codeInputs.length) {
            // Автоматически переключаем фокус на следующее поле
            codeInputs[index].focus();
        }
    }
    codeInputs.forEach((item, i) => {
        item.addEventListener('input', () => {
            handleInput(i + 1);
        });
        item.addEventListener('focus', () => {
            // Проверяем предыдущие инпуты на наличие незаполненных данных
            for (let j = i - 1; j >= 0; j--) {
                if (codeInputs[j].value === '') {
                    // Если находим незаполненный инпут, перенаправляем фокус на него
                    codeInputs[j].focus();
                    break;
                }
            }
        });
    });

    const firstInput = codeInputs[0];

    // Добавляем обработчик события для вставки кода в первый инпут
    firstInput.addEventListener('paste', (event) => {
        // Предотвращаем стандартное поведение вставки
        event.preventDefault();

        // Получаем вставленный текст
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');

        // Разбиваем текст на отдельные символы
        const characters = pastedText.split('');

        // Перебираем все инпуты и устанавливаем значение
        codeInputs.forEach((input, index) => {
            if (characters[index]) {
                input.value = characters[index];
                input.classList.remove('_has-error');
                input.classList.add('_is-filled');
                input.parentElement.classList.remove('_has-error');
            }
        });

        if (characters.length > codeInputs.length || characters.length == codeInputs.length) {
            codeInputs[codeInputs.length - 1].focus();
        }
        if (characters.length < codeInputs.length) {
            codeInputs[characters.length - 1].focus();
        }
    });

    codeInputs.forEach((item, i) => {
        item.addEventListener('input', () => {
            handleInput(i + 1);
        });

        item.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && item.value === '') {
                if (i > 0) {
                    codeInputs[i - 1].focus();
                }
            }
        });
    });
}

function modalLogin () {
    const btn = document.querySelector('.header__actions-item--lk')

    if (window.innerWidth < 768) {
        btn.dataset.modal="#loginModal"
    } 
    else {
        btn.dataset.modal=""
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            btn.dataset.modal="#loginModal"
        } 
        else {
            btn.dataset.modal=""
        }
    })
}