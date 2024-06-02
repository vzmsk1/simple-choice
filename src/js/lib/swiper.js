import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade, Controller, Autoplay } from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

function initSliders() {
    function setSlidesHeight(wrapper, slides) {
        const arr = [];

        slides.forEach((slide) => arr.push(slide.offsetHeight));

        wrapper.style.height = `${Math.max(...arr)}px`;
    }

    if (document.querySelector('.hero__swiper')) {
        const carousel = new Swiper('.hero__swiper', {
            modules: [Navigation, Pagination, EffectFade, Controller, Autoplay],
            speed: 1000,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            allowTouchMove: false,
            navigation: {
                nextEl: '.hero .swiper-nav__arr_next',
                prevEl: '.hero .swiper-nav__arr_prev'
            },
            pagination: {
                el: '.hero__fraction',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;

                    return cur;
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
                    if (mm.matches) {
                        setSlidesHeight(swiper.wrapperEl, swiper.slides);
                    } else {
                        swiper.wrapperEl.style.height = '100%';
                    }

                    mm.addEventListener('change', function () {
                        setSlidesHeight(swiper.wrapperEl, swiper.slides);
                    });
                }
            }
        });

        carousel.controller.control = titles;
        titles.controller.control = carousel;
    }
    if (document.querySelectorAll('.shopify__swiper').length) {
        document.querySelectorAll('.shopify__swiper').forEach((carousel) => {
            new Swiper(carousel, {
                modules: [Navigation, Pagination],
                speed: 800,
                spaceBetween: remToPx(4),
                loop: true,
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
                        slidesPerView: 4
                    }
                }
            });
        });
    }
    if (document.querySelector('.about__swiper')) {
        const carousel = new Swiper('.about__swiper', {
            modules: [Navigation, Pagination, Controller, Autoplay],
            speed: 1000,
            virtualTranslate: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.about .swiper-nav__arr_next',
                prevEl: '.about .swiper-nav__arr_prev'
            },
            pagination: {
                el: '.about__fraction',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;

                    return cur;
                }
            },
            on: {
                slideChangeTransitionStart: (swiper) => {
                    setTimeout(() => {
                        swiper.animating = false;
                    }, 0);
                }
            }
        });
        const titles = new Swiper('.about__titles-swiper', {
            modules: [Controller],
            speed: 1000,
            loop: true,
            virtualTranslate: true,
            allowTouchMove: false,
            on: {
                afterInit: (swiper) => {
                    setSlidesHeight(swiper.wrapperEl, swiper.slides);
                }
            }
        });

        carousel.controller.control = titles;
        titles.controller.control = carousel;
    }
    if (document.querySelector('.lookbook__swiper ')) {
        const carousel = new Swiper('.lookbook__swiper ', {
            modules: [Navigation, Pagination, Controller, Autoplay],
            speed: 1000,
            virtualTranslate: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.lookbook .swiper-nav__arr_next',
                prevEl: '.lookbook .swiper-nav__arr_prev'
            },
            pagination: {
                el: '.lookbook__fraction',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;

                    return cur;
                }
            },
            on: {
                slideChangeTransitionStart: (swiper) => {
                    setTimeout(() => {
                        swiper.animating = false;
                    }, 0);
                }
            }
        });
        const titles = new Swiper('.lookbook__titles', {
            modules: [Controller],
            speed: 1000,
            loop: true,
            virtualTranslate: true,
            allowTouchMove: false,
            on: {
                afterInit: (swiper) => {
                    setSlidesHeight(swiper.wrapperEl, swiper.slides);
                }
            }
        });

        carousel.controller.control = titles;
        titles.controller.control = carousel;
    }
    if (document.querySelectorAll('.reviews__swiper').length) {
        document.querySelectorAll('.reviews__swiper').forEach((carousel, idx) => {
            new Swiper(carousel, {
                modules: [Navigation, Pagination],
                speed: 1000,
                direction: 'vertical',
                reverseDirection: idx === 1 ? true : false,
                spaceBetween: remToPx(4),
                slidesPerView: 'auto',
                allowTouchMove: false,
                loop: true,
                navigation: {
                    nextEl: '.reviews .swiper-nav__arr_next',
                    prevEl: '.reviews .swiper-nav__arr_prev'
                },
                pagination: {
                    el: '.reviews__fraction',
                    type: 'custom',
                    renderCustom: function (swiper, current, total) {
                        const cur = current < 10 ? '0' + current : current;

                        return cur;
                    }
                }
            });
        });
    }
}

window.addEventListener('load', initSliders);

window.addEventListener('resize', function () {
    const ww = window.innerWidth;

    setTimeout(() => {
        if (ww === window.innerWidth) {
            initSliders();
        }
    }, 500);
});
