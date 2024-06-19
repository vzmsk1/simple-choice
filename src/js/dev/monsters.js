function onClickHandler(e) {
    const { target } = e;
    if (target.closest('.reviews-page__item')) {
        const rev = target.closest('.reviews-page__item').cloneNode(true)
        if(document.querySelector('.modal_rev').querySelector(".modal__body").querySelector(".reviews-page__item")) {
            document.querySelector('.modal_rev').querySelector(".modal__body").querySelector(".reviews-page__item").remove()
        }
        document.querySelector('.modal_rev').querySelector(".modal__body").appendChild(rev)
    }
}
document.addEventListener('click', onClickHandler);
