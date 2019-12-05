const burgerMenu = () => {
    const hiddenLarge = document.querySelector('.hidden-large'),
        headerMain = document.querySelector('.header-main'),
        topMenu = document.querySelector('.top-menu'),
        imgBurger = topMenu.querySelector('img'),
        popupMenu = document.querySelector('.popup-menu'),
        imgPopupMenu = popupMenu.querySelector('img');
    let head = document.querySelector('.head'),
        headHiight = head.clientHeight,
        burgerWidthWindow = document.documentElement.clientWidth;
    
    window.addEventListener('resize', () => {
        burgerWidthWindow = document.documentElement.clientWidth;
        headHiight = head.clientHeight;
        
        if (burgerWidthWindow < 768) {
            hiddenLarge.style.display = 'block';
        } else {
            hiddenLarge.style.display = 'none';
        }
    });  

    window.addEventListener('scroll', () => {
        let windowHeight = document.documentElement.scrollTop;

        if (windowHeight >= headHiight && burgerWidthWindow < 768) {
            topMenu.style.cssText = `
                position: fixed;
                top: 0;
            `;
        } else if (windowHeight < headHiight && burgerWidthWindow < 768) {
            topMenu.style.cssText = `
                position: none;
            `;
        }
    });

    headerMain.addEventListener('click', (event) => {
        let target = event.target;
        if (target === imgBurger) {
            popupMenu.style.display = 'flex';
        } else if (target === imgPopupMenu) {
            popupMenu.style.display = 'none';
        } 

        target = target.parentNode;
        if (target.tagName === 'LI') {
            popupMenu.style.display = 'none';
        }
       
    });
};

export default burgerMenu;