import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.defaults({
    duration: 1
});
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mm = gsap.matchMedia();
let set = gsap.timeline({
    defaults: {
        duration: 0
    }
});
const scrollTriggerAnimations = {
    shopify() {
        const sections = document.querySelectorAll('.shopify');

        if (sections.length) {
            sections.forEach((section) => {
                gsap.to(section.querySelectorAll('.shopify__slide_has-anim'), {
                    translateY: '16rem',
                    duration: 0
                });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 40%'
                    }
                }).to(section.querySelectorAll('.shopify__slide_has-anim'), {
                    translateY: 0
                });
            });
        }
    },
    header() {
        if (document.querySelector('.hero')) {
            const header = document.querySelector('.header');

            function setHeaderClass(self) {
                console.log(self.trigger);
                if (!self.trigger.classList.contains('dark-bg')) {
                    header.classList.add('_blue-colored');
                } else {
                    header.classList.remove('_blue-colored');
                }
            }

            document.querySelectorAll('section').forEach((section) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: window.innerWidth > 768 ? 'top 30%' : 'top top',
                        end: 'bottom top',
                        onEnter: (self) => {
                            setHeaderClass(self);
                        },
                        onEnterBack: (self) => {
                            setHeaderClass(self);
                        }
                    }
                });
            });
        }
    }
};

function gsapSet() {
    set.to('.header__content', { translateY: '-15rem', opacity: 0 });
    set.to('.slide-hero__info, .slide-hero__preview', { opacity: 0 });
    set.to('.hero__title-wrap:first-of-type .title-wrap__title-txt span', {
        translateY: '11rem',
        rotate: -2
    });
    set.to('.hero__title-wrap:first-of-type .title-wrap__subtitle', {
        translateY: '-5rem'
    });
    set.to('.hero__fraction, .hero__swiper-nav', { opacity: 0 });
    set.to('.header__logo-wrap', { translateY: '6rem', translateX: '9rem', opacity: 0 });
}

function animateLoader(loader) {
    if (loader && !loader.classList.contains('_is-hidden')) {
        gsapSet();

        window.addEventListener('load', function () {
            const loaderAnim = gsap.timeline();

            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }

            window.scrollTo(0, 0);

            setTimeout(bodyLock, 0);

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
        .to('.slide-hero__info, .slide-hero__preview', { opacity: 1 }, 0)
        .to('.header__content', { translateY: 0, opacity: 1 }, 0)
        .to(
            '.hero__title-wrap:first-of-type .title-wrap__title-txt span, .hero__title-wrap:first-of-type .title-wrap__subtitle',
            { translateY: 0, rotate: 0, duration: 0.5 },
            0
        )
        .to('.hero__fraction, .hero__swiper-nav', { opacity: 1 }, 0)
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
            0
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

function initAnchors() {
    if (document.querySelectorAll('[data-anchor]').length && window.innerWidth > 768) {
        document.querySelectorAll('[data-anchor]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                gsap.to(window, {
                    scrollTo: {
                        y: `#${anchor.dataset.anchor}`,
                        offsetY: anchor.dataset.anchorOffset ? +anchor.dataset.anchorOffset : 0
                    },
                    duration: 1.5
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.loader');

    scrollTriggerAnimations.header();

    initAnchors();

    mm.add('(min-width: 768px)', () => {
        animateLoader(loader);

        scrollTriggerAnimations.shopify();
    });
    mm.add('(max-width: 768px)', () => {
        loader && loader.classList.add('_is-hidden');
    });
});
