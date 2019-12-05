const burgerMenu = () => {
    const hiddenLarge = document.querySelector('.hidden-large'),
        topMenu = document.querySelector('.top-menu');
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
                z-index: 3000;
            `;
        } else if (windowHeight < headHiight && burgerWidthWindow < 768) {
            topMenu.style.cssText = `
                position: none;
            `;
        }
    });
};

export default burgerMenu;