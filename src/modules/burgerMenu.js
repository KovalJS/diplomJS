const burgerMenu = () => {
    const hiddenLarge = document.querySelector('.hidden-large');

    window.addEventListener('resize', () => {
        let burgerWidthWindow = document.documentElement.clientWidth;
        
        if (burgerWidthWindow < 768) {
            hiddenLarge.style.display = 'block';
        } else {
            hiddenLarge.style.display = 'none';
        }
    });   
};

export default burgerMenu;