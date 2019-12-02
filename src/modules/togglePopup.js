const togglePopup = () => {
    const headMain = document.querySelector('.head-main'),
        popupVisit = document.querySelector('#free_visit_form'),
        classPopup = document.querySelectorAll('.popup');

    headMain.addEventListener('click', (event) => {
        let target = event.target;

        if (target.className === 'open-popup' || target.className === 'btn callback-btn') {
            popupVisit.style.display = 'block';
        }  
    });

    classPopup.forEach(item => {
        item.addEventListener('click', (event) => {
            let target = event.target;
            
            if (target.className === 'close_icon') {
                item.style.display = 'none';
            } else {
                target = target.closest('.form-content');
            
                if(!target) {
                    item.style.display = 'none';
                }
            }
        });
    });

    
};

export default togglePopup;