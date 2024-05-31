import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade, Controller } from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

function initSliders() {
    if (document.querySelector('.hero__swiper')) {
        function setSlidesHeight(wrapper, slides) {
            if (mm.matches) {
                const arr = [];

                slides.forEach((slide) => arr.push(slide.offsetHeight));

                wrapper.style.height = `${Math.max(...arr) / 5}rem`;
            } else {
                wrapper.style.height = '100%';
            }
        }

        const carousel = new Swiper('.hero__swiper', {
            modules: [Navigation, Pagination, EffectFade, Controller],
            speed: 1000,
            effect: 'fade',
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.hero .swiper-nav__arr_next',
                prevEl: '.hero .swiper-nav__arr_prev'
            },
            pagination: {
                el: '.hero__fraction',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return current;
                }
            }
        });
        const titles = new Swiper('.hero__titles', {
            modules: [Controller],
            speed: 1000,
            loop: true,
            virtualTranslate: true,
            allowTouchMove: false,
            on: {
                afterInit: (swiper) => {
                    setSlidesHeight(swiper.wrapperEl, swiper.slides);

                    mm.addEventListener('change', function () {
                        setSlidesHeight(swiper.wrapperEl, swiper.slides);
                    });
                }
            }
        });

        carousel.controller.control = titles;
        titles.controller.control = carousel;
    }
}

document.addEventListener('DOMContentLoaded', initSliders);

window.addEventListener('resize', function () {
    const ww = window.innerWidth;

    setTimeout(() => {
        if (ww === window.innerWidth) {
            initSliders();
        }
    }, 500);
});
