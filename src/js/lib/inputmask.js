import Inputmask from 'inputmask';

// --------------------------------------------------------------------------

const initInputmask = () => {
    const telInputCollection = document.querySelectorAll('[data-tel-mask]');

    if (telInputCollection.length) {
        telInputCollection.forEach((input) => {
            Inputmask({ mask: '+7 (999) 999-99-99', showMaskOnHover: false, clearIncomplete: true }).mask(
                input
            );
        });
    }

    const birthInputCollection = document.querySelectorAll('[data-birth-mask]');
    if (birthInputCollection.length) {
        birthInputCollection.forEach((input) => {
            Inputmask({ mask: '99.99.9999', showMaskOnHover: false, clearIncomplete: true }).mask(
                input
            );
        });
    }


};
initInputmask();
