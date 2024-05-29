import Swiper from 'swiper';
import 'swiper/css';
import { remToPx } from '../utils/utils';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

function initSliders() {
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
