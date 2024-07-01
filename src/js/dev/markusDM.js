import $ from "jquery";
import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade, Controller, Autoplay, Thumbs } from 'swiper/modules';
import Plyr from 'plyr';

if (document.querySelector('.card__center')) {
    const cardThumb = new Swiper('.card__swiper-images', {
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        spaceBetween: remToPx(1.2), 
        speed: 1200,
        slideToClickedSlide: true
    });

    const cardSwiper = new Swiper('.card__swiper', {
        modules: [Thumbs, Navigation, Pagination, EffectFade],
        speed: 1200,
        grabCursor: true,
        effect: 'fade', 
        thumbs: {
            swiper: cardThumb
        },

        navigation: {
            prevEl: '.card__swiper-nav .swiper-nav__arr_prev',
            nextEl: '.card__swiper-nav .swiper-nav__arr_next'
        },
        pagination: {
            el: ('.card__fraction'),
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                const cur = current < 10 ? '0' + current : current;
    
                return cur;
            }
        },

        breakpoints: {
            0: {
                spaceBetween: remToPx(1.2), 
            },
            768: {
                spaceBetween: remToPx(1.6)
            }
        }
    });
}

const theModelSwiper = new Swiper('.the-model__swiper', {
    modules: [Thumbs, Navigation, Pagination, EffectFade],
    speed: 1200,
    grabCursor: true,
    effect: 'fade', 
   
    navigation: {
        prevEl: '.the-model__swiper-nav .swiper-nav__arr_prev',
        nextEl: '.the-model__swiper-nav .swiper-nav__arr_next'
    },
    pagination: {
        el: ('.the-model__fraction'),
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            const cur = current < 10 ? '0' + current : current;

            return cur;
        }
    },

    breakpoints: {
        0: {
            spaceBetween: remToPx(1.2), 
        },
        768: {
            spaceBetween: remToPx(1.6)
        }
    }
});


const productDataSwiper= new Swiper('.product-data__swiper', {
    slidesPerView: 1,
    modules: [Navigation, Pagination],
    spaceBetween: remToPx(1.2), 
    speed: 1200,
    navigation: {
        prevEl: '.product-data__swiper-nav .swiper-nav__arr_prev',
        nextEl: '.product-data__swiper-nav .swiper-nav__arr_next'
    },
    pagination: {
        el: ('.product-data__fraction'),
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            const cur = current < 10 ? '0' + current : current;

            return cur;
        }
    },
  
    breakpoints: {
      769: {
        slidesPerView: 3,
        spaceBetween: remToPx(1.2), 
      },
    },
  });


  const newsDgallerySwiper = new Swiper('.news-d__gallery-swiper', {
    slidesPerView: 1,
    modules: [Navigation, Pagination],
    spaceBetween: remToPx(1.2), 
    speed: 1200,
    navigation: {
        prevEl: '.news-d__swiper-nav .swiper-nav__arr_prev',
        nextEl: '.news-d__swiper-nav .swiper-nav__arr_next'
    },
    pagination: {
        el: ('.news-d__fraction'),
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            const cur = current < 10 ? '0' + current : current;

            return cur;
        }
    },
  
    breakpoints: {
      769: {
        slidesPerView: 3,
        spaceBetween: remToPx(1.2), 
      },
    },
  });





$( document ).ready(function() {
    $('.card__like').on('click', function() {
        $(this).toggleClass('active');
    });

    $('.card__content-down-item').on('click', function() {
        $('.card__content-down-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.card__tab').on('click', function() {
        $('.card__tab').removeClass('active');
        $(this).addClass('active');
    });

   
    let more = $(this).find('.card__content-icon');
    let hide = $(this).find('.card__content-down-lists');
    hide.hide(300);
    more.click(function () {
            hide.slideToggle(400);
            more.toggleClass('active');
    });
   
});

const player = new Plyr('#player', {
    controls: ['play-large']
});





$(document).ready(function() {
    var $button = $('.filters__btn');
    var $section2 = $('#section2');

   
    if ($section2.length && $button.length) {
        function checkScroll() {
            var section2Top = $section2.offset().top;
            var scrollPos = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scrollPos + windowHeight > section2Top) {
                $button.fadeIn();
            } else {
                $button.fadeOut();
            }
        }

       
        checkScroll();

       
        $(window).on('scroll', checkScroll);
    }
});