import { bodyLock, bodyLockToggle, bodyUnlock, removeClasses, setClassOnClick } from '../utils/utils';

const mq = window.matchMedia('(max-width: 768px)');

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
                tiles.forEach((tile, idx) => {
                    tile.addEventListener('mouseover', function () {
                        setClasses(images, idx, '_is-active');
                        setClasses(bullets, idx, '_is-active');
                    });

                    tile.addEventListener('mouseout', function () {
                        setClasses(images, 0, '_is-active');
                        setClasses(bullets, 0, '_is-active');
                    });
                });

                setClasses(images, 0, '_is-active');
                setClasses(bullets, 0, '_is-active');
            }

            function onClickHandler(e) {
                const { target } = e;
                const targetBullet = target.closest('[data-tile-bullet]');

                if (
                    targetBullet ||
                    target.closest('.shopify-card__cart-btn') ||
                    target.closest('.shopify-card__fav-btn') ||
                    target.closest('.shopify-card__btn-wrap')
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

function toggleClass(target, trigger, closeTrigger, classname) {
    if (target.closest(trigger)) {
        document.documentElement.classList.toggle(classname);
        mq.matches && bodyLockToggle();
    } else if (!target.closest(closeTrigger) && document.documentElement.classList.contains(classname)) {
        document.documentElement.classList.remove(classname);
        mq.matches && bodyUnlock();
    }
}

function onClickHandler(e) {
    const { target } = e;

    const showSearch = document.documentElement.classList.contains('_show-search');

    if (target.closest('[data-search-btn]')) {
        if (!showSearch) {
            document.documentElement.classList.add('_show-search');
            mq.matches && bodyLock();
        }
    }
    if (
        showSearch &&
        ((!target.closest('.search-header') && !mq.matches) || target.closest('[data-search-btn]'))
    ) {
        document.documentElement.classList.remove('_show-search');
        mq.matches && bodyUnlock();
    }

    if (target.closest('.filters__reset-btn')) {
        const form = target.closest('form');
        form.reset();

        if (form.querySelectorAll('[checked]').length) {
            form.querySelectorAll('[checked]').forEach((el) => el.removeAttribute('checked'));
        }
    }

    toggleClass(target, '.sort-catalog__btn', '.sort-catalog', '_show-categories');
    toggleClass(target, '.filters__btn', '.filters', '_show-filters');
}

function handleSearch() {
    const search = document.querySelector('.search-header__input input');
    const searchModal = document.querySelector('.search-header');
    const results = document.querySelectorAll('.search-header__group_results .list-search-header__text');

    function trimValue(txt) {
        return txt.trim().toLowerCase();
    }

    function searchCharacters(result) {
        const txt = trimValue(result.dataset.value);

        if (txt.match(search.value)) {
            result.innerHTML = txt.replace(search.value, `<span>${txt.match(search.value)[0]}</span>`);
        } else {
            result.innerHTML = txt;
        }
    }

    if (search && searchModal) {
        search.addEventListener('input', function () {
            const value = trimValue(search.value);

            if (results.length) {
                results.forEach((result) => {
                    searchCharacters(result);

                    !value.length && (result.innerHTML = trimValue(result.dataset.value));
                });
            }

            if (value.length) {
                searchModal.classList.add('_show-results');
            } else {
                searchModal.classList.remove('_show-results');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initTiles();
    handleSearch();
    setClassOnClick(document.querySelector('.cookie__btn'), document.querySelector('.cookie'), '_is-hidden');
});

document.addEventListener('click', onClickHandler);
