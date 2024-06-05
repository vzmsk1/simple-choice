import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

function initSimplebar() {
    if (document.querySelectorAll('[data-sb]').length) {
        document.querySelectorAll('[data-sb]').forEach((el) => {
            const clone = el.cloneNode(true);

            if (window.innerWidth <= 768) {
                el.parentElement.append(clone);
                el.remove();
            } else {
                setTimeout(() => {
                    new SimpleBar(el, {
                        autoHide: false
                    });
                }, 0);
            }
        });
    }
}

initSimplebar();
window.addEventListener('resize', initSimplebar);
