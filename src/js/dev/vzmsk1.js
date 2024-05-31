import gsap from 'gsap';
import { bodyLock, bodyUnlock, removeClasses } from '../utils/utils';

gsap.defaults({
    duration: 1
});

const mm = gsap.matchMedia();
let set = gsap.timeline({
    defaults: {
        duration: 0
    }
});

function gsapSet() {
    set.to('.header__content', { translateY: '-15rem', opacity: 0 });
    set.to('.slide-hero__info, .slide-hero__preview', { opacity: 0 });
    set.to('.hero__title-wrap.swiper-slide-active .title-wrap__title-txt span', {
        translateY: '11rem',
        rotate: -2
    });
    set.to('.hero__title-wrap.swiper-slide-active .title-wrap__subtitle', {
        translateY: '-5rem'
    });
    set.to('.hero__navigation', { opacity: 0 });
    set.to('.header__logo-wrap', { translateY: '6rem', translateX: '9rem', opacity: 0 });
}

function animateLoader(loader) {
    if (loader && !loader.classList.contains('_is-hidden')) {
        bodyLock();
        gsapSet();

        window.addEventListener('load', function () {
            const loaderAnim = gsap.timeline();

            loaderAnim
                .to('.loader__logo-wrap', {
                    clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
                    duration: 0.7,
                    delay: 0.5
                })
                .to(loader, { '--y': 0, duration: 1.3 }, 1)
                .to(loader, { '--y2': '-100%', duration: 1.4 }, 1.05)
                .fromTo(
                    '.swiper-slide-active .slide-hero__bg-wrap',
                    { translateY: '59rem', duration: 2 },
                    { translateY: 0 },
                    1.05
                )
                .to(
                    '.loader__inner',
                    {
                        clipPath:
                            'polygon(0% 0%, 0% 100%, 38% 100%, 38% 15%, 62% 15%, 62% 85%, 0 85%, 0 100%, 100% 100%, 100% 0%)',
                        duration: 0,
                        onComplete: () => {
                            gsap.timeline()
                                .to('.loader__inner', {
                                    clipPath:
                                        'polygon(0% 0%, 0% 100%, 0% 99%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)',
                                    duration: 1
                                })
                                .to('.loader__logo-wrap', {
                                    top: '9rem',
                                    left: '29rem',
                                    opacity: 0,
                                    duration: 0.7,
                                    onComplete: () => {
                                        loader.style.display = 'none';
                                        animateHero();
                                        bodyUnlock();
                                    }
                                })
                                .to('.header__logo-wrap', { opacity: 1 }, 1.2);
                        }
                    },
                    2.2
                );
        });
    }
}

function animateHero() {
    let heroAnim = gsap.timeline({ defaults: { duration: 0.5 } });

    heroAnim
        .to('.slide-hero__info, .slide-hero__preview', { opacity: 1 })
        .to('.header__content', { translateY: 0, opacity: 1 })
        .to(
            '.hero__title-wrap.swiper-slide-active .title-wrap__title-txt span, .hero__title-wrap.swiper-slide-active .title-wrap__subtitle',
            { translateY: 0, rotate: 0 },
            0.3
        )
        .to('.hero__navigation', { opacity: 1 }, 0.3)
        .to('.header__logo-wrap', { translateY: 0, translateX: 0 }, 0)
        .to(
            '.hero',
            {
                '--opacity': 0.1,
                duration: 0.4,
                onComplete: () => {
                    gsap.to('.hero', {
                        '--opacity': 0,
                        duration: 0.3
                    });
                }
            },
            0.1
        );

    setTimeout(() => {
        document.querySelector('.hero').classList.add('_a-complete');
        heroAnim.revert();
        heroAnim.kill();
        set.revert();
        set.kill();
        heroAnim = null;
        set = null;
    }, 1000);
}

function initTiles() {
    if (document.querySelectorAll('[data-tiles-container]').length) {
        const containers = document.querySelectorAll('[data-tiles-container]');

        function setClasses(items, idx, classname) {
            if (items.length && items[idx]) {
                removeClasses(items, classname);
                items[idx].classList.add(classname);
            }
        }

        containers.forEach((container) => {
            const tiles = container.querySelectorAll('[data-tile]');
            const bullets = Array.from(container.querySelectorAll('[data-tile-bullet]'));
            const images = container.querySelectorAll('[data-tile-img]');

            if (tiles.length && tiles.length > 1) {
                tiles.forEach((tile, idx) =>
                    tile.addEventListener('mouseover', function () {
                        setClasses(images, idx, '_is-active');
                        setClasses(bullets, idx, '_is-active');
                    })
                );

                setClasses(images, 0, '_is-active');
                setClasses(bullets, 0, '_is-active');
            }

            function onClickHandler(e) {
                const { target } = e;
                const targetBullet = target.closest('[data-tile-bullet]');

                if (
                    targetBullet ||
                    target.closest('.shopify-card__cart-btn') ||
                    target.closest('.shopify-card__fav-btn')
                ) {
                    e.preventDefault();
                }

                if (targetBullet) {
                    const idx = bullets.indexOf(targetBullet);

                    setClasses(bullets, idx, '_is-active');
                    setClasses(images, idx, '_is-active');
                }
            }

            container.addEventListener('click', onClickHandler);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.loader');

    initTiles();

    mm.add('(min-width: 768px)', () => {
        animateLoader(loader);
        return () => {};
    });
    mm.add('(max-width: 768px)', () => {
        loader && loader.classList.add('_is-hidden');
        return () => {};
    });
});
