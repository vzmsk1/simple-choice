import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade, Controller, Autoplay } from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

const swiperDefaults = {
    speed: 1500,
    loop: true
};

function setSlidesHeight(wrapper, slides) {
    const arr = [];

    slides.forEach((slide) => arr.push(slide.offsetHeight));

    wrapper.style.height = `${Math.max(...arr)}px`;
}

function initHeroSlider(classname, eventsConfig = {}) {
    if (document.querySelector(`.${classname}__swiper`)) {
        const carousel = new Swiper(`.${classname}__swiper`, {
            modules: [Navigation, Pagination, EffectFade, Controller, Autoplay],
            ...swiperDefaults,
            effect: 'fade',
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            //     waitForTransition: false
            // },
            allowTouchMove: false,
            navigation: {
                nextEl: `.${classname} .swiper-nav__arr_next`,
                prevEl: `.${classname} .swiper-nav__arr_prev`
            },
            pagination: {
                el: `.${classname}__fraction`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const cur = current < 10 ? '0' + current : current;

                    return cur;
                }
            },
            ...eventsConfig
        });
        const titles = new Swiper(`.${classname}__titles`, {
            modules: [Controller],
            ...swiperDefaults,
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
}

function initSliders() {
    initHeroSlider('hero', {
        on: {
            init: (swiper) => {
                swiper.autoplay.stop();

                setTimeout(() => {
                    swiper.autoplay.start();
                }, 5000);
            }
        }
    });
    if (document.querySelectorAll('.shopify__swiper').length) {
        document.querySelectorAll('.shopify__swiper').forEach((carousel) => {
            new Swiper(carousel, {
                modules: [Navigation, Pagination],
                ...swiperDefaults,
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
                        slidesPerView: 4
                    }
                }
            });
        });
    }
    if (document.querySelector('.about__swiper')) {
        const carousel = new Swiper('.about__swiper', {
            modules: [Navigation, Pagination, Controller, Autoplay],
            ...swiperDefaults,
            virtualTranslate: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                waitForTransition: false
            },
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
            ...swiperDefaults,
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
            ...swiperDefaults,
            virtualTranslate: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                waitForTransition: false
            },
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

            ...swiperDefaults,
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
    if (
        document.querySelectorAll('.reviews__swiper-cnt._desktop-only .reviews__swiper').length &&
        !mm.matches
    ) {
        document
            .querySelectorAll('.reviews__swiper-cnt._desktop-only .reviews__swiper')
            .forEach((carousel, idx) => {
                new Swiper(carousel, {
                    modules: [Pagination],

                    ...swiperDefaults,
                    direction: 'vertical',
                    spaceBetween: remToPx(4),
                    slidesPerView: 'auto',
                    allowTouchMove: false,
                    centeredSlides: idx !== 2,
                    centeredSlidesBounds: idx !== 2,
                    pagination:
                        idx === 2
                            ? {
                                  el: '.reviews__fraction',
                                  type: 'custom',
                                  renderCustom: function (swiper, current, total) {
                                      const cur = current < 10 ? '0' + current : current;

                                      return cur;
                                  }
                              }
                            : {},
                    on: {
                        afterInit: (swiper) => {
                            document
                                .querySelector('.reviews .swiper-nav__arr_prev')
                                .addEventListener('click', function () {
                                    if (idx !== 1) {
                                        swiper.slideNext();
                                    } else {
                                        swiper.slidePrev();
                                    }
                                });
                            document
                                .querySelector('.reviews .swiper-nav__arr_next')
                                .addEventListener('click', function () {
                                    if (idx !== 1) {
                                        swiper.slidePrev();
                                    } else {
                                        swiper.slideNext();
                                    }
                                });
                        }
                    }
                });
            });
    }
    if (document.querySelector('.reviews__swiper-cnt._mobile-only .reviews__swiper') && mm.matches) {
        new Swiper('.reviews__swiper-cnt._mobile-only .reviews__swiper', {
            modules: [Navigation, Pagination],

            ...swiperDefaults,
            spaceBetween: remToPx(4),
            navigation: {
                prevEl: '.reviews .swiper-nav__arr_prev',
                nextEl: '.reviews .swiper-nav__arr_next'
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
    }
    if (document.querySelector('.news__swiper')) {
        new Swiper('.news__swiper', {
            modules: [Navigation, Pagination],
            virtualTranslate: true,
            ...swiperDefaults,
            navigation: {
                nextEl: '.news .swiper-nav__arr_next',
                prevEl: '.news .swiper-nav__arr_prev'
            },
            pagination: {
                el: '.news__fraction',
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
    }
    if (document.querySelector('.search-header__swiper') && mm.matches) {
        new Swiper('.search-header__swiper', {
            ...swiperDefaults,
            slidesPerView: 'auto',
            spaceBetween: remToPx(4)
        });
    }
    initHeroSlider('chapter-hero');
    if (document.querySelector('.catalog__categories-swiper')) {
        new Swiper('.catalog__categories-swiper', {
            modules: [Navigation],
            ...swiperDefaults,
            slidesPerView: 'auto',
            spaceBetween: remToPx(2),
            navigation: {
                nextEl: '.catalog .swiper-nav__arr_next',
                prevEl: '.catalog .swiper-nav__arr_prev'
            }
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
