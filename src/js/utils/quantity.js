function initQuantityInputs() {
    if (document.querySelectorAll('.quantity').length) {
        document.querySelectorAll('.quantity').forEach((el) => {
            const input = el.querySelector('.quantity__input');
            const minusBtn = el.querySelector('.quantity__count_minus');
            const addBtn = el.querySelector('.quantity__count_add');
            const qtyMin = input.min ? parseInt(input.min) : null;
            const qtyMax = input.max ? parseInt(input.max) : null;

            input.addEventListener('change', function () {
                const qty = parseInt(input.value);

                if (qtyMin && (isNaN(qty) || qty <= qtyMin)) {
                    input.value = qtyMin;
                    minusBtn.setAttribute('disabled', '');
                } else {
                    minusBtn.removeAttribute('disabled');

                    if (qtyMax && qty >= qtyMax) {
                        input.value = qtyMax;
                        addBtn.setAttribute('disabled', '');
                    } else {
                        input.value = qty;
                        addBtn.removeAttribute('disabled');
                    }
                }
            });

            el.addEventListener('click', function (e) {
                if (e.target.closest('.quantity__count')) {
                    const target = e.target.closest('.quantity__count');
                    const operator = target.dataset.action;
                    let qty = parseInt(input.value);

                    if (operator === 'add') {
                        qty += 1;

                        if (qtyMin && qty >= qtyMin + 1) {
                            addBtn.removeAttribute('disabled');
                        }

                        if (qtyMax && qty >= qtyMax) {
                            addBtn.setAttribute('disabled', '');
                        }
                    } else {
                        qty = qty <= qtyMin ? qtyMin : (qty -= 1);

                        if (qtyMin && qty === qtyMin) {
                            minusBtn.setAttribute('disabled', '');
                        }

                        if (qtyMax && qty < qtyMax) {
                            minusBtn.removeAttribute('disabled');
                        }
                    }

                    input.value = qty;
                }
            });
        });
    }
}
initQuantityInputs();
